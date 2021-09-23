import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { VM } from "../vm.js";
import { getStackParams } from "../getStackParams.js";

const lt: FunctionInvocationOperation = (stack: Stack, context: Context) => {
  const [num1, num2] = getStackParams("lt", ["number", "number"], stack) as [number, number];
  const retval = num1 < num2 ? 1 : 0;
  stack.push(retval);
}
export default lt;
