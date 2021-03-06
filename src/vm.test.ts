import { Context, Instruction, Tokenizer, VM } from ".";
import { LabelMap, Stack } from "./interfaces";
import { mockProcessStdout } from "jest-mock-process";

function createVMAndRunStdRepCode(instructions: Instruction[], initialContext?: Context, initialLabelMap?: LabelMap) {
  if (initialLabelMap === undefined) {
    initialLabelMap = {};
  }
  const vm = new VM(initialContext !== undefined ? initialContext : {});
  vm.loadProgramList(instructions, initialLabelMap);
  vm.run();
  return vm;
}

function createVM(codeBlock: string, initialContext?: Context, initialLabelMap?: LabelMap) {
  if (initialLabelMap === undefined) {
    initialLabelMap = {};
  }
  const vm = new VM(initialContext !== undefined ? initialContext : {});
  const tokenizer = new Tokenizer();
  const instructions = tokenizer.transform(tokenizer.tokenize(codeBlock));
  vm.loadProgramList(instructions, initialLabelMap);
  return vm;
}

function createVMAndRunCode(codeBlock: string, initialContext?: Context, initialLabelMap?: LabelMap) {
  const vm = createVM(codeBlock, initialContext, initialLabelMap);
  vm.run();
  return vm;
}

function expectStack(codeBlock: string, expectedStack: Stack) {
  const vm = createVM(codeBlock);
  vm.run();
  expect(vm.stack).toEqual(expectedStack);
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
  expectStack(`1 2 3`, [1, 2, 3]);
  expectStack(`-1 -2 -3`, [-1, -2, -3]);
});

test('should push strings to the stack', () => {
  expectStack(`"foo" "bar" "baz"`, ["foo", "bar", "baz"]);
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

test('should delete context', () => {
  expect(createVMAndRunCode(`"FOO" "bar" setContext "bar" delContext`).context.bar).toBe(undefined);
  expect(JSON.stringify(createVMAndRunCode(`"FOO" "bar" setContext "bar" delContext`).context)).toBe("{}");
});


test('should throw an error when trying to get context for unknown variables', () => {
  const ctx = { "ham": "ster", "one": 1, "two": 2 };
  expect(() => createVMAndRunCode(`"asdfzxc" getContext`, ctx)).toThrow();
});

test('should add numbers', () => {
  expectStack(`1 2 +`, [3]);
  expectStack(`1 2 plus`, [3]);
});

test('should subtract numbers', () => {
  expectStack(`1 2 -`, [1]);
  expectStack(`1 2 min`, [1]);
  expectStack(`1 10 min`, [9]);
});

test('should multiply numbers', () => {
  expectStack(`2 3 *`, [6]);
  expectStack(`2 3 mul`, [6]);
});

test('should support the not instruction', () => {
  expectStack(`0 not`, [1]);
  expectStack(`1 not`, [0]);
  expectStack(`42 not`, [0]);
});

test('should support jgz, { and } for jgz-style if statements', () => {
  expectStack(`1 jgz { "EXPECT_THIS" } "AND_THIS"`, ["EXPECT_THIS", "AND_THIS"]);
  expectStack(`0 jgz { "EXPECT_NOT_THIS" } "EXPECT_ONLY_THIS"`, ["EXPECT_ONLY_THIS"]);
});

test('should support jz', () => {
  expectStack(`0 jz "no"`, []);
  expectStack(`1 jz "yes"`, ["yes"]);
  expectStack(`-1 jz "yes"`, ["yes"]);
});

test('should support jgz', () => {
  expectStack(`0 jgz "yes"`, ["yes"]);
  expectStack(`-1 jgz "yes"`, ["yes"]);
  expectStack(`1 jgz "no"`, []);
});


test('should support braces', () => {
  expectStack(`1 2 { 3 4 5 } 6 7`, [1, 2, 6, 7]);
});

test('should support nested braces', () => {
  expectStack(`1 2 { 3 { 4 5 } 6 } 7`, [1, 2, 7]);
})

test('should support the goto instruction', () => {
  expectStack(`5 goto "foo" "bar" "baz" "quux" exit`, ["quux"]);
  expect(createVMAndRunCode(`"myLabel" goto "foo" "bar" "baz" "quux" exit`, {}, { myLabel: 5 }).stack).toEqual(["quux"]);
});

test('should calculate equality between values on the stack', () => {
  expectStack(`1 1 eq`, [1]); // equal
  expectStack(`0 0 eq`, [1]); // equal
  expectStack(`"foo" "foo" eq`, [1]); // equal
  expectStack(`"foo" "bar" eq`, [0]); // not equal
  expectStack(`1 2 eq`, [0]); // not equal
  expectStack(`2 1 eq`, [0]); // not equal
  expectStack(`"0" 0 eq`, [0]); // not equal
});

test('should calculate greater than', () => {
  expectStack(`1 1 gt`, [0]); // not greater than
  expectStack(`1 0 gt`, [0]); // not greater than
  expectStack(`1 2 gt`, [1]); // greater than
});

test('should calculate less than', () => {
  expectStack(`1 1 lt`, [0]); // not less than
  expectStack(`1 2 lt`, [0]); // not less than
  expectStack(`1 0 lt`, [1]); // less than
});

test('should concat', () => {
  expectStack(`"one" "two" concat`, ["twoone"]);
  expectStack(`"1" "two" concat`, ["two1"]);
  expectStack(`1 2 concat`, ["21"]);
  expectStack(`"one" 2 concat`, ["2one"]);
});

test('should rconcat (reverse concat)', () => {
  expectStack(`"one" "two" rconcat`, ["onetwo"]);
  expectStack(`"1" "two" rconcat`, ["1two"]);
  expectStack(`1 2 rconcat`, ["12"]);
  expectStack(`"one" 2 rconcat`, ["one2"]);
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
  expectStack(`nop nop ppc`, [2]);
  expectStack(`ppc`, [0]);
});

test('should do nothing on nop instruction', () => {
  expectStack(`nop nop nop`, []);
  expect(createVMAndRunCode(`nop`).programCounter).toEqual(1);
  expect(createVMAndRunCode(`nop`).context).toEqual({});
});

test('should calculate and', () => {
  expectStack(`1 1 and`, [1]);
  expectStack(`1 0 and`, [0]);
  expectStack(`0 1 and`, [0]);
  expectStack(`0 0 and`, [0]);
  expectStack(`1 9 and`, [1]);
  expectStack(`9 1 and`, [1]);
});

test('should calculate or', () => {
  expectStack(`1 1 or`, [1]);
  expectStack(`1 0 or`, [1]);
  expectStack(`0 1 or`, [1]);
  expectStack(`0 0 or`, [0]);
  expectStack(`1 9 or`, [1]);
  expectStack(`9 1 or`, [1]);
});

test('should duplicate top item from stack via dup', () => {
  expectStack(`1 dup`, [1, 1]);
  expectStack(`0 dup`, [0, 0]);
  expectStack(`"test" dup`, ["test", "test"]);
  expectStack(`42 dup`, [42, 42]);
});

test('should pop top item from stack via pop', () => {
  expectStack(`1 pop`, []);
  expectStack(`0 pop`, []);
  expectStack(`"test" pop`, []);
  expectStack(`1 2 3 pop`, [1, 2]);
});

test('should support labels via tokenizer', () => {
  const vm = createVMAndRunCode(`1 "Awesome" goto 2 3 #Awesome nop`);
  expect(vm.labelMap["Awesome"]).toBe(4);
  expect(vm.stack).toEqual([1, 3]);
});

test('should support the`stacksize opcode', () => {
  expectStack(`"f" "o" "o" stacksize`, ["f", "o", "o", 3]);
  expectStack(`stacksize`, [0]);
});

test('should support Standard Representation code', () => {
  expect(createVMAndRunStdRepCode([
    {
      "type": "push-number-instruction",
      "value": 42
    },
    {
      "type": "push-number-instruction",
      "value": 8
    },
    {
      "type": "invoke-function-instruction",
      "functionName": "+"
    },
    {
      "type": "push-string-instruction",
      "value": "Foo"
    },
    {
      "type": "invoke-function-instruction",
      "functionName": "setContext"
    }
  ]).context).toEqual({ "Foo": 50 });
})

test('should support labels in Standard Representation code', () => {
  expect(createVMAndRunStdRepCode([
    {
      "type": "push-number-instruction",
      "value": 1
    },
    {
      "type": "push-string-instruction",
      "value": "Awesome"
    },
    {
      "type": "invoke-function-instruction",
      "functionName": "goto"
    },
    {
      "type": "push-number-instruction",
      "value": 2,
      "comment": "Due to the goto above, this instruction will be skipped, and so 2 won't be pushed to the stack"
    },
    {
      "type": "push-number-instruction",
      "value": 3,
      "label": "Awesome"
    },
    {
      "type": "invoke-function-instruction",
      "functionName": "nop"
    }
  ]).stack).toEqual([1, 3]);
});

test('example tests', () => {
  expectStack(`1 1 + 2 eq jgz { "1 + 1 = 2!" }`, ["1 + 1 = 2!"]);
  expectStack(`1 1 + 2 eq dup jgz { "1 + 1 = 2!" pop } jz { "1 + 1 is not 2!?" }`, []);
  expectStack(`1 1 + 2 eq "conditionResult" setContext "conditionResult" getContext jgz { "1 + 1 = 2!" } "conditionResult" getContext jz { "1 + 1 is not 2!?" }`, ["1 + 1 = 2!"]);
  expectStack(`"Hello" "," " world!" rconcat rconcat`, ["Hello, world!"]);
  expectStack(`1 2 3 4 "hi" 0 -1 0 0 1 1 stacksize jgz { pop } stacksize jgz { 9 ppc - goto }`, []);
});

test('poor man\'s function', () => {
  const vm = createVMAndRunCode(`
{
  nop #mul3
  "_mul3_return_pc" setContext
  3 *
  "_mul3_return_pc" getContext 3 + "_mul3_return_pc" delContext goto
}
1 ppc "mul3" goto
2 ppc "mul3" goto
3 ppc "mul3" goto
4 ppc "mul3" goto
`);
  expect(vm.stack).toEqual([3, 6, 9, 12]);
  expect(JSON.stringify(vm.context)).toEqual("{}");
});

test('stdout', () => {
  const stdOut = mockProcessStdout();
  expectStack(`1 stdout`, []);
  expect(stdOut).toHaveBeenCalledWith('1');
  expectStack(`"hello" stdout`, []);
  expect(stdOut).toHaveBeenCalledWith('hello');
  stdOut.mockRestore();
});
