import { Stack, Context, getStackParams } from "..";

export default function concat(stack: Stack) {
  const [str1, str2] = getStackParams("concat", ["string", "string"], stack) as [string, string];
  const retval = `${str1}${str2}`;
  stack.push(retval);
  return retval;
}