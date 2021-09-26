import { Stack, Context, FunctionInvocationOperation } from "../interfaces";
import { getStackParams } from "../getStackParams";

const setContext: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [str1, arg2] = getStackParams("setContext", ["string", "string | number"], stack) as [string, string | number];
  context[str1] = arg2;
}
export default setContext;