import { Stack, Context, getStackParams } from "..";

export default function getContext(stack: Stack, context: Context) {
  const [str1] = getStackParams("getContext", ["string"], stack) as [string];
  const retval = context[str1];
  if (retval === null || retval === undefined) {
    throw new Error(`getContext: null/undefined can not be pushed to the context! StackParam: ${str1}`);
  }
  stack.push(retval);
  return retval;
}
