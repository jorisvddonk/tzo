import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";
/**
 * nop opcode: do nothing.
 */
const nop: FunctionInvocationOperation = () => {
  // do nothing
}
export default nop;
