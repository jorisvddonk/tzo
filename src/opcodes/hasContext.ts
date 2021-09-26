import { Stack, Context, FunctionInvocationOperation } from "../interfaces";
import { getStackParams } from "../getStackParams";

const hasContext: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [str1] = getStackParams("hasContext", ["string"], stack) as [string];
  if (context.hasOwnProperty(str1)) {
    stack.push(1);
  } else {
    stack.push(0);
  }
}
export default hasContext;