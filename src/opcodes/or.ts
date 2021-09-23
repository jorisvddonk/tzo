import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const or: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [num1, num2] = getStackParams("or", ["number", "number"], stack) as [number, number];
  stack.push(num1 !== 0 || num2 !== 0 ? 1 : 0);
}
export default or;