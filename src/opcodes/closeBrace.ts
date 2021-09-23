import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { getStackParams } from "../getStackParams.js";

const closeBrace: FunctionInvocationOperation = (stack: Stack) => { // jump to matching brace (target))
  // do nothing. We support "executing" these so that we can have if/else statements
}
export default closeBrace;
