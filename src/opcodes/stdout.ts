import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const stdout: FunctionInvocationOperation = (stack: Stack) => { // pop an element from the stack, and print it on standard output
  process.stdout.write("" + stack.pop());
}
export default stdout;