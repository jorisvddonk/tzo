import { Stack, Context, getStackParams, FunctionInvocationOperation } from "..";

const charCode: FunctionInvocationOperation = (stack: Stack) => {
  const [num] = getStackParams("charCode", ["number"], stack) as [number];
  const retval = String.fromCharCode(num);
  stack.push(retval);
}
export default charCode;