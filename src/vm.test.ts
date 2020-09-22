import { Context, Tokenizer, VM } from ".";

function createVMAndRunCode(codeBlock: string, initialContext?: Context) {
  const vm = new VM(initialContext !== undefined ? initialContext : {});
  const tokenizer = new Tokenizer();
  const { instructions, labelMap } = tokenizer.transform(tokenizer.tokenize(codeBlock));
  vm.loadProgramList(instructions);
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
