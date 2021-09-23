import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const pause: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => {
  vm.suspend();
}
export default pause;