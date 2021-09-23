import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const hasContext: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [str1] = getStackParams("hasContext", ["string"], stack) as [string];
  if (context.hasOwnProperty(str1)) {
    stack.push(1);
  } else {
    stack.push(0);
  }
}
export default hasContext;