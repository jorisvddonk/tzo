import { Stack, Context, getStackParams } from "..";

export default function rconcat(stack: Stack) {
  const [str1, str2] = getStackParams("rconcat", ["string", "string"], stack) as [string, string];
  const retval = `${str2}${str1}`;
  stack.push(retval);
  return retval;
}
