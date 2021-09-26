import { Stack, Context, FunctionInvocationOperation } from "../interfaces";
import { VM } from "../vm";

const openBrace: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => { // jump to matching brace (source)
  let i = 0;
  let pc = vm.programCounter + 1;
  while (true) {
    if (vm.programList[pc].name === "openBrace") { // bit dirty! TODO: improve? 
      i += 1;
    }
    if (vm.programList[pc].name === "closeBrace") { // bit dirty! TODO: improve? 
      i -= 1;
      if (i === -1) {
        vm.programCounter = pc + 1;
        break;
      }
    }
    pc += 1;
  }
}
export default openBrace;