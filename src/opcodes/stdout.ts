import { Stack, FunctionInvocationOperation } from "..";

const stdout: FunctionInvocationOperation = (stack: Stack) => { // pop an element from the stack, and print it on standard output
  process.stdout.write("" + stack.pop());
}
export default stdout;