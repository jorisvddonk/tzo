import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const stacksize: FunctionInvocationOperation = (stack: Stack) => { // push the size of the stack to the stack
  stack.push(stack.length);
}
export default stacksize;