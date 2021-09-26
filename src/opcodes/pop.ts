import { Stack, FunctionInvocationOperation } from "../interfaces";

const pop: FunctionInvocationOperation = (stack: Stack) => { // pop an element from the stack
  stack.pop();
}
export default pop;