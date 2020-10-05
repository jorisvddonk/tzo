import { Stack, Context, getStackParams, FunctionInvocationOperation } from "..";

const delContext: FunctionInvocationOperation = (stack: Stack, context: Context) => { // Deletes a value from the context
  const [str] = getStackParams("delContext", ["string"], stack) as [string];
  delete context[str];
}
export default delContext;