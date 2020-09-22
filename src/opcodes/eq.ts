import { Stack, Context, getStackParams } from "..";

export default function eq(stack: Stack, context: Context) {
  const [val1, val2] = getStackParams("eq", ["string | number", "string | number"], stack) as [string | number, string | number];
  const retval = val1 === val2 ? 1 : 0;
  stack.push(retval);
  return retval;
}
