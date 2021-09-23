import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const exit: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => {
  vm.quit();
}
export default exit;