import { Stack, Context, getStackParams } from "..";

export default function charCode(stack: Stack) {
  const [num] = getStackParams("charCode", ["number"], stack) as [number];
  const retval = String.fromCharCode(num);
  stack.push(retval);
  return retval;
}