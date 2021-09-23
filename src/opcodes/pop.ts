import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const pop: FunctionInvocationOperation = (stack: Stack) => { // pop an element from the stack
  stack.pop();
}
export default pop;