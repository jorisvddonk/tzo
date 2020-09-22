import { Stack, Context, getStackParams } from "..";

export default function randInt(stack: Stack) {
  const [max] = getStackParams("randInt", ["number"], stack) as [number];
  const retval = Math.floor(Math.random() * max);
  stack.push(retval);
  return retval;
}