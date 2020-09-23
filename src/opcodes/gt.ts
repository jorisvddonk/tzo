import { Stack, Context, getStackParams, FunctionInvocationOperation } from "..";

const gt: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [num1, num2] = getStackParams("gt", ["number", "number"], stack) as [number, number];
  const retval = num1 > num2 ? 1 : 0;
  stack.push(retval);
  return retval;
}
export default gt;