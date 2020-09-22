import { Stack, Context, getStackParams } from "..";

// also known as '+'
export default function plus(stack: Stack) {
  const [num1, num2] = getStackParams("+", ["number", "number"], stack) as [number, number];
  const retval = num1 + num2;
  stack.push(retval);
  return retval;
}
