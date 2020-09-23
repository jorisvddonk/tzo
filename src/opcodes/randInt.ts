import { Stack, Context, getStackParams, FunctionInvocationOperation } from "..";

const randInt: FunctionInvocationOperation = (stack: Stack) => {
  const [max] = getStackParams("randInt", ["number"], stack) as [number];
  const retval = Math.floor(Math.random() * max);
  stack.push(retval);
  return retval;
}
export default randInt;