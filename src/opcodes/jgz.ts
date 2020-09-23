import { Stack, Context, getStackParams, VM, FunctionInvocationOperation } from "..";

const jgz: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => { // jump (skip next instruction) if stack.pop() is greater than zero
  const [num1] = getStackParams("jgz", ["number"], stack) as [number];
  if (num1 > 0) {
    vm.programCounter += 2; // it would normally already jump one, but since we modify it won't and we have to jump over ourselves
  }
}
export default jgz;