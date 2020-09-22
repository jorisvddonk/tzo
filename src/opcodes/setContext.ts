import { Stack, Context, getStackParams } from "..";

export default function setContext(stack: Stack, context: Context) {
  const [str1, arg2] = getStackParams("setContext", ["string", "string | number"], stack) as [string, string | number];
  context[str1] = arg2;
  return null;
}
