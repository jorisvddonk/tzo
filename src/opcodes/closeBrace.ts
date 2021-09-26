import { Stack, Context, FunctionInvocationOperation } from "../interfaces";
import { getStackParams } from "../getStackParams";

const closeBrace: FunctionInvocationOperation = function closeBrace(stack: Stack) { // jump to matching brace (target))
  // do nothing. We support "executing" these so that we can have if/else statements
}
export default closeBrace;
