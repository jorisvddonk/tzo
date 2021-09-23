import { VM } from "./vm.js";

export type instructiontype = "push-number-instruction" | "push-string-instruction" | "invoke-function-instruction";
export type BaseInstruction<T extends instructiontype> = {
  type: T,
  comment?: string,
  label?: string
}
export type PushNumberInstruction = BaseInstruction<"push-number-instruction"> & {
  value: number;
}
export type PushStringInstruction = BaseInstruction<"push-string-instruction"> & {
  value: string;
}
export type InvokeFunctionInstruction = BaseInstruction<"invoke-function-instruction"> & {
  functionName: string;
}
export type Instruction = PushNumberInstruction | PushStringInstruction | InvokeFunctionInstruction;


export type NumberPushOperation = (stack: Stack, context?: Context) => number;
export type StringPushOperation = (stack: Stack, context?: Context) => string;
export type FunctionInvocationOperation = (stack: Stack, context: Context, vm?: VM) => void;

export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
export type InstructionOperation = NumberPushOperation | StringPushOperation | FunctionInvocationOperation;

export type Stack = Array<string | number>;
export type Context = { [key: string]: string | number | null }
export type Instructions = Array<InstructionOperation>;
export type LabelMap = { [key: string]: number };
export type Functions = { [key: string]: FunctionInvocationOperation };

export type TzoVMState = {
  stack: Stack;
  context: Context;
  programList: Instruction[];
  labelMap: LabelMap;
  programCounter: number;
  exit: boolean;
  pause: boolean;
}
