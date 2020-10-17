import { Stack, Context, getStackParams, FunctionInvocationOperation } from "..";

const rconcat: FunctionInvocationOperation = (stack: Stack) => {
  const [val1, val2] = getStackParams("rconcat", ["string | number", "string | number"], stack) as [string | number, string | number];
  stack.push(`${val2}${val1}`);
}
export default rconcat;