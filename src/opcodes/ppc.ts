import { Stack, Context, FunctionInvocationOperation } from "../interfaces";
import { VM } from "../vm";

/**
 * ppc opcode: push the current program counter (pointing to the location of this `ppc` instruction in the program memory) to the stack.
 */
const ppc: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => {
  stack.push(vm.programCounter);
}
export default ppc;
