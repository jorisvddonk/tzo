import { Stack, FunctionInvocationOperation } from "..";

const pop: FunctionInvocationOperation = (stack: Stack) => { // pop an element from the stack
  stack.pop();
}
export default pop;