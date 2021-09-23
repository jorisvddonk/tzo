import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { getStackParams } from "../getStackParams.js";

const and: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [num1, num2] = getStackParams("and", ["number", "number"], stack) as [number, number];
  stack.push(num1 !== 0 && num2 !== 0 ? 1 : 0);
}
export default and;