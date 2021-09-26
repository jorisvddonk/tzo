import { Stack, FunctionInvocationOperation } from "../interfaces";

const stacksize: FunctionInvocationOperation = (stack: Stack) => { // push the size of the stack to the stack
  stack.push(stack.length);
}
export default stacksize;