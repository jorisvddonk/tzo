import { Stack, Context, getStackParams, FunctionInvocationOperation } from "..";

/**
 * not opcode: pop one element from the stack. If it is 0, push 1. Otherwise, push 0.
 */
const not: FunctionInvocationOperation = (stack: Stack) => {
  const [num1] = getStackParams("not", ["number"], stack) as [number];
  if (num1 === 0) {
    stack.push(1);
  } else {
    stack.push(0);
  }
}
export default not;
