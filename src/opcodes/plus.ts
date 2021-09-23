import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

// also known as '+'
const plus: FunctionInvocationOperation = (stack: Stack) => {
  const [num1, num2] = getStackParams("+", ["number", "number"], stack) as [number, number];
  const retval = num1 + num2;
  stack.push(retval);
}
export default plus;