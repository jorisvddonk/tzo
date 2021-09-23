import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const randInt: FunctionInvocationOperation = (stack: Stack) => {
  const [max] = getStackParams("randInt", ["number"], stack) as [number];
  const retval = Math.floor(Math.random() * max);
  stack.push(retval);
}
export default randInt;