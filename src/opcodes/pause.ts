import { Stack, Context, FunctionInvocationOperation } from "../interfaces";
import { VM } from "../vm";

const pause: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => {
  vm.suspend();
}
export default pause;