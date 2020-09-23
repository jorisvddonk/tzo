import { Stack, Context, getStackParams, FunctionInvocationOperation } from "..";

const lt: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [num1, num2] = getStackParams("lt", ["number", "number"], stack) as [number, number];
  const retval = num1 < num2 ? 1 : 0;
  stack.push(retval);
  return retval;
}
export default lt;
