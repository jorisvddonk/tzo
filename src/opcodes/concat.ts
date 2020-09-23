import { Stack, Context, getStackParams, FunctionInvocationOperation } from "..";

const concat: FunctionInvocationOperation = (stack: Stack) => {
  const [str1, str2] = getStackParams("concat", ["string", "string"], stack) as [string, string];
  const retval = `${str1}${str2}`;
  stack.push(retval);
  return retval;
}
export default concat;