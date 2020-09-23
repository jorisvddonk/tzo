import { Stack, Context, getStackParams, VM, FunctionInvocationOperation } from "..";

const closeBrace: FunctionInvocationOperation = (stack: Stack) => { // jump to matching brace (target))
  return null; // do nothing. We support "executing" these so that we can have if/else statements
}
export default closeBrace;
