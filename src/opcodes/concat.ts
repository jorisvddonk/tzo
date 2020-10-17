import { Stack, Context, getStackParams, FunctionInvocationOperation } from "..";

const concat: FunctionInvocationOperation = (stack: Stack) => {
  const [val1, val2] = getStackParams("concat", ["string | number", "string | number"], stack) as [string | number, string | number];
  stack.push(`${val1}${val2}`);
}
export default concat;