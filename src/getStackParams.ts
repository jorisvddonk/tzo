import { Stack } from "./interfaces.js";


export function getStackParams(functionName: string, paramTypes: Array<"string" | "number" | "string | number">, stack: Stack) {
  /**
   * Convenience function. Gets params from the stack and throws an error if there's an issue.
   */
  return paramTypes.map((paramType, i) => {
    const val = stack.pop();
    if (paramType === "string | number") {
      if (typeof val !== "number" && typeof val !== "string") {
        throw new Error(`${functionName}: stack param ${i + 1} is not a string or number!`);
      }
    } else {
      if (typeof val !== paramType) {
        throw new Error(`${functionName}: stack param ${i + 1} is not a ${paramType}! Value: ${val}`);
      }
    }
    return val;
  });
}
