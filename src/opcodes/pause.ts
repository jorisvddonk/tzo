import { Stack, Context, VM, FunctionInvocationOperation } from "..";

const pause: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => {
  vm.suspend();
  return null;
}
export default pause;