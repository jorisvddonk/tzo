import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { getStackParams } from "../getStackParams.js";

/**
 * Pop the top item from the stack, then push it twice, effectively duplicating it. 
 */
const dup: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [val] = getStackParams("dup", ["string | number"], stack) as [string | number];
  stack.push(val);
  stack.push(val);
}
export default dup;