import { Stack, Context, VM, FunctionInvocationOperation } from "..";

const exit: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => {
  vm.quit();
  return null;
}
export default exit;