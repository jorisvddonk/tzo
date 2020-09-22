import { Stack, Context, VM } from "..";

export default function pause(stack: Stack, context: Context, vm: VM) {
  vm.suspend();
  return null;
}
