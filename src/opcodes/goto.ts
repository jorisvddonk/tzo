import { Stack, Context, getStackParams, VM } from "..";

export default function goto(stack: Stack, context: Context, vm: VM) {
  const [str1] = getStackParams("goto", ["string"], stack) as [string];
  const newPC = vm.labelMap[str1];
  if (newPC === undefined) {
    throw new Error(`goto: attempting to jump to undefined label ${str1}`);
  }
  vm.logger(`goto: setting pC to ${newPC} `);
  vm.programCounter = newPC;
  return null;
}
