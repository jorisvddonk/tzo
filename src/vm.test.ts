import { Context, Tokenizer, VM } from ".";
import { LabelMap } from "./interfaces";

function createVMAndRunCode(codeBlock: string, initialContext?: Context, initialLabelMap?: LabelMap) {
  if (initialLabelMap === undefined) {
    initialLabelMap = {};
  }
  const vm = new VM(initialContext !== undefined ? initialContext : {});
  const tokenizer = new Tokenizer();
  const { instructions, labelMap } = tokenizer.transform(tokenizer.tokenize(codeBlock));
  vm.loadProgramList(instructions, { ...initialLabelMap, ...labelMap });
  vm.run();
  return vm;
}

test('should have an initial state', () => {
  const vm = new VM({});
  expect(vm.programCounter).toBe(0);
  expect(vm.context).toEqual({});
  expect(vm.labelMap).toEqual({});
  expect(vm.programList).toEqual([]);
  expect(vm.stack).toEqual([]);
  expect(vm.exit).toBe(false);
  expect(vm.pause).toBe(false);
});

test('should push numbers to the stack', () => {
  expect(createVMAndRunCode(`1 2 3`).stack).toEqual([1, 2, 3]);
});

test('should push strings to the stack', () => {
  expect(createVMAndRunCode(`"foo" "bar" "baz"`).stack).toEqual(["foo", "bar", "baz"]);
});

test('should set context', () => {
  expect(createVMAndRunCode(`"FOO" "bar" setContext`).context.bar).toBe("FOO");
  expect(createVMAndRunCode(`1 "bar" setContext`).context.bar).toBe(1);
});

test('should get context', () => {
  const ctx = { "ham": "ster", "one": 1, "two": 2 };
  expect(createVMAndRunCode(`"ham" getContext`, ctx).stack).toEqual(["ster"]);
  expect(createVMAndRunCode(`"one" getContext`, ctx).stack).toEqual([1]);
});

test('should throw an error when trying to get context for unknown variables', () => {
  const ctx = { "ham": "ster", "one": 1, "two": 2 };
  expect(() => createVMAndRunCode(`"asdfzxc" getContext`, ctx)).toThrow();
});

test('should add numbers', () => {
  expect(createVMAndRunCode(`1 2 +`).stack).toEqual([3]);
  expect(createVMAndRunCode(`1 2 plus`).stack).toEqual([3]);
});

test('should subtract numbers', () => {
  expect(createVMAndRunCode(`1 2 -`).stack).toEqual([1]);
  expect(createVMAndRunCode(`1 2 min`).stack).toEqual([1]);
  expect(createVMAndRunCode(`1 10 min`).stack).toEqual([9]);
});

test('should multiply numbers', () => {
  expect(createVMAndRunCode(`2 3 *`).stack).toEqual([6]);
  expect(createVMAndRunCode(`2 3 mul`).stack).toEqual([6]);
});

test('should support the not instruction', () => {
  expect(createVMAndRunCode(`0 not`).stack).toEqual([1]);
  expect(createVMAndRunCode(`1 not`).stack).toEqual([0]);
  expect(createVMAndRunCode(`42 not`).stack).toEqual([0]);
});

test('should support jgz, { and } for jgz-style if statements', () => {
  expect(createVMAndRunCode(`1 jgz { "EXPECT_THIS" } "AND_THIS"`).stack).toEqual(["EXPECT_THIS", "AND_THIS"]);
  expect(createVMAndRunCode(`0 jgz { "EXPECT_NOT_THIS" } "EXPECT_ONLY_THIS"`).stack).toEqual(["EXPECT_ONLY_THIS"]);
});

test('should support braces', () => {
  expect(createVMAndRunCode(`1 2 { 3 4 5 } 6 7`).stack).toEqual([1, 2, 6, 7]);
});

test('should support nested braces', () => {
  expect(createVMAndRunCode(`1 2 { 3 { 4 5 } 6 } 7`).stack).toEqual([1, 2, 7]);
})

test('should support the goto instruction', () => {
  expect(createVMAndRunCode(`5 goto "foo" "bar" "baz" "quux" exit`).stack).toEqual(["quux"]);
  expect(createVMAndRunCode(`"myLabel" goto "foo" "bar" "baz" "quux" exit`, {}, { myLabel: 5 }).stack).toEqual(["quux"]);
});

test('should calculate equality between values on the stack', () => {
  expect(createVMAndRunCode(`1 1 eq`).stack).toEqual([1]); // equal
  expect(createVMAndRunCode(`0 0 eq`).stack).toEqual([1]); // equal
  expect(createVMAndRunCode(`"foo" "foo" eq`).stack).toEqual([1]); // equal
  expect(createVMAndRunCode(`"foo" "bar" eq`).stack).toEqual([0]); // not equal
  expect(createVMAndRunCode(`1 2 eq`).stack).toEqual([0]); // not equal
  expect(createVMAndRunCode(`2 1 eq`).stack).toEqual([0]); // not equal
  expect(createVMAndRunCode(`"0" 0 eq`).stack).toEqual([0]); // not equal
});

test('should calculate greater than', () => {
  expect(createVMAndRunCode(`1 1 gt`).stack).toEqual([0]); // not greater than
  expect(createVMAndRunCode(`1 0 gt`).stack).toEqual([0]); // not greater than
  expect(createVMAndRunCode(`1 2 gt`).stack).toEqual([1]); // greater than
});

test('should calculate less than', () => {
  expect(createVMAndRunCode(`1 1 lt`).stack).toEqual([0]); // not less than
  expect(createVMAndRunCode(`1 2 lt`).stack).toEqual([0]); // not less than
  expect(createVMAndRunCode(`1 0 lt`).stack).toEqual([1]); // less than
});

test('should concat', () => {
  expect(createVMAndRunCode(`"one" "two" concat`).stack).toEqual(["twoone"]);
  expect(createVMAndRunCode(`"1" "two" concat`).stack).toEqual(["two1"]);
});

test('should rconcat (reverse concat)', () => {
  expect(createVMAndRunCode(`"one" "two" rconcat`).stack).toEqual(["onetwo"]);
  expect(createVMAndRunCode(`"1" "two" rconcat`).stack).toEqual(["1two"]);
});

test('should pause', () => {
  const vm = createVMAndRunCode(`"foo" "bar" pause "baz" "quux"`);
  expect(vm.stack).toEqual(["foo", "bar"]);
  expect(vm.pause).toEqual(true);
  expect(vm.exit).toEqual(false);
  expect(vm.programCounter).toEqual(3); // pause WILL increment the programCounter!
  vm.run();
  expect(vm.stack).toEqual(["foo", "bar", "baz", "quux"]);
  expect(vm.pause).toEqual(false);
  expect(vm.exit).toEqual(true);
  expect(vm.programCounter).toEqual(5);
});

test('should exit', () => {
  const vm = createVMAndRunCode(`"foo" "bar" exit "baz" "quux"`);
  expect(vm.stack).toEqual(["foo", "bar"]);
  expect(vm.pause).toEqual(false);
  expect(vm.exit).toEqual(true);
  expect(vm.programCounter).toEqual(3); // exit WILL increment the programCounter!
  vm.run(); // this is a no-op, effectively, as the VM can not run anymore!
  expect(vm.stack).toEqual(["foo", "bar"]);
  expect(vm.pause).toEqual(false);
  expect(vm.exit).toEqual(true);
  expect(vm.programCounter).toEqual(3);
});

test('should push program counter on ppc instruction', () => {
  expect(createVMAndRunCode(`nop nop ppc`).stack).toEqual([2]);
  expect(createVMAndRunCode(`ppc`).stack).toEqual([0]);
});

test('should do nothing on nop instruction', () => {
  expect(createVMAndRunCode(`nop nop nop`).stack).toEqual([]);
  expect(createVMAndRunCode(`nop`).programCounter).toEqual(1);
  expect(createVMAndRunCode(`nop`).context).toEqual({});
});

test('should calculate and', () => {
  expect(createVMAndRunCode(`1 1 and`).stack).toEqual([1]);
  expect(createVMAndRunCode(`1 0 and`).stack).toEqual([0]);
  expect(createVMAndRunCode(`0 1 and`).stack).toEqual([0]);
  expect(createVMAndRunCode(`0 0 and`).stack).toEqual([0]);
  expect(createVMAndRunCode(`1 9 and`).stack).toEqual([1]);
  expect(createVMAndRunCode(`9 1 and`).stack).toEqual([1]);
});

test('should calculate or', () => {
  expect(createVMAndRunCode(`1 1 or`).stack).toEqual([1]);
  expect(createVMAndRunCode(`1 0 or`).stack).toEqual([1]);
  expect(createVMAndRunCode(`0 1 or`).stack).toEqual([1]);
  expect(createVMAndRunCode(`0 0 or`).stack).toEqual([0]);
  expect(createVMAndRunCode(`1 9 or`).stack).toEqual([1]);
  expect(createVMAndRunCode(`9 1 or`).stack).toEqual([1]);
});