import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { getStackParams } from "../getStackParams.js";

const concat: FunctionInvocationOperation = (stack: Stack) => {
  const [val1, val2] = getStackParams("concat", ["string | number", "string | number"], stack) as [string | number, string | number];
  stack.push(`${val1}${val2}`);
}
export default concat;