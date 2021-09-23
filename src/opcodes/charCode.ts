import { Stack, Context, FunctionInvocationOperation } from "../interfaces.js";
import { getStackParams } from "../getStackParams.js";

const charCode: FunctionInvocationOperation = (stack: Stack) => {
  const [num] = getStackParams("charCode", ["number"], stack) as [number];
  const retval = String.fromCharCode(num);
  stack.push(retval);
}
export default charCode;