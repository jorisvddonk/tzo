import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { getStackParams } from "../getStackParams.js";

const delContext: FunctionInvocationOperation = (stack: Stack, context: Context) => { // Deletes a value from the context
  const [str] = getStackParams("delContext", ["string"], stack) as [string];
  delete context[str];
}
export default delContext;