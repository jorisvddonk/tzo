import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";
const setContext: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [str1, arg2] = getStackParams("setContext", ["string", "string | number"], stack) as [string, string | number];
  context[str1] = arg2;
}
export default setContext;