import { Stack, Context, FunctionInvocationOperation } from "../interfaces";
import { getStackParams } from "../getStackParams";

const charCode: FunctionInvocationOperation = (stack: Stack) => {
  const [num] = getStackParams("charCode", ["number"], stack) as [number];
  const retval = String.fromCharCode(num);
  stack.push(retval);
}
export default charCode;