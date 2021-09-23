import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const goto: FunctionInvocationOperation = (stack: Stack, context: Context, vm: VM) => {
  const [val1] = getStackParams("goto", ["string | number"], stack) as [string | number];
  if (typeof val1 === "string") {
    const newPC = vm.labelMap[val1];
    if (newPC === undefined) {
      throw new Error(`goto: attempting to jump to undefined label ${val1}`);
    }
    vm.logger(`goto: setting pC to ${newPC} (goto ${val1}) `);
    vm.programCounter = newPC;
  } else if (typeof val1 === "number") {
    vm.logger(`goto: setting pC to ${val1} (goto ${val1}) `);
    vm.programCounter = val1;
  }
}
export default goto;