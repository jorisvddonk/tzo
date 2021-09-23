import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { getStackParams } from "../getStackParams.js";

const eq: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [val1, val2] = getStackParams("eq", ["string | number", "string | number"], stack) as [string | number, string | number];
  const retval = val1 === val2 ? 1 : 0;
  stack.push(retval);
}
export default eq;