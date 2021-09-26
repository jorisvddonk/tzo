import { Stack, Context, FunctionInvocationOperation } from "../interfaces";
import { VM } from "../vm";

const exit: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => {
  vm.quit();
}
export default exit;