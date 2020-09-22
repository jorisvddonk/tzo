import { Stack, Context, VM } from "..";

export default function exit(stack: Stack, context: Context, vm: VM) {
  vm.quit();
  return null;
}
