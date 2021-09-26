import { Stack, FunctionInvocationOperation } from "../interfaces";
import { getStackParams } from "../getStackParams";

const randInt: FunctionInvocationOperation = (stack: Stack) => {
  const [max] = getStackParams("randInt", ["number"], stack) as [number];
  const retval = Math.floor(Math.random() * max);
  stack.push(retval);
}
export default randInt;