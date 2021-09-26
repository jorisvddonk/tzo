import { Stack, FunctionInvocationOperation } from "../interfaces";
import { getStackParams } from "../getStackParams";

// also known as '+'
const plus: FunctionInvocationOperation = (stack: Stack) => {
  const [num1, num2] = getStackParams("+", ["number", "number"], stack) as [number, number];
  const retval = num1 + num2;
  stack.push(retval);
}
export default plus;