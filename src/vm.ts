import debug from "debug";
import { Context, FunctionInvocationOperation, Functions, Instruction, InstructionOperation, Instructions, instructiontype, InvokeFunctionInstruction, LabelMap, NumberPushOperation, PushNumberInstruction, PushStringInstruction, Stack, StringPushOperation, TzoVMState } from "./interfaces";
import charCode from "./opcodes/charCode";
import closeBrace from "./opcodes/closeBrace";
import concat from "./opcodes/concat";
import eq from "./opcodes/eq";
import exit from "./opcodes/exit";
import getContext from "./opcodes/getContext";
import goto from "./opcodes/goto";
import gt from "./opcodes/gt";
import jgz from "./opcodes/jgz";
import lt from "./opcodes/lt";
import min from "./opcodes/min";
import mul from "./opcodes/mul";
import openBrace from "./opcodes/openBrace";
import pause from "./opcodes/pause";
import plus from "./opcodes/plus";
import randInt from "./opcodes/randInt";
import rconcat from "./opcodes/rconcat";
import setContext from "./opcodes/setContext";

export const getStackParams = (functionName: string, paramTypes: Array<"string" | "number" | "string | number">, stack: Stack) => {
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

export const std_functions: Functions = {
  "randInt": randInt,
  "charCode": charCode,
  "+": plus,
  "plus": plus,
  "-": min,
  "min": min,
  "*": mul,
  "mul": mul,
  "concat": concat,
  "rconcat": rconcat,
  "getContext": getContext,
  "setContext": setContext,
  "gt": gt,
  "lt": lt,
  "eq": eq,
  "jgz": jgz,
  "exit": exit,
  "pause": pause,
  "goto": goto,
  "{": openBrace,
  "}": closeBrace,
}

export class VM {
  stack: Stack = [];
  context: Context = {};
  programList: InstructionOperation[] = [];
  labelMap: LabelMap = {};
  functions: Functions;

  programCounter: number = 0;
  exit: boolean = false;
  pause: boolean = false;

  logger = debug("tzo-vm");

  constructor(initialContext: Context, additionalFunctions: Functions = {}) {
    this.context = initialContext;
    this.functions = {
      ...std_functions, ...additionalFunctions
    };
  }

  quit() { // quit, so as to not name clash
    this.exit = true;
  }

  suspend() { // suspend, so as to not name clash
    this.pause = true;
  }

  invoke(instructions: Instructions) {
    this.logger("invoking!");
    let retval: ReturnType<InstructionOperation> = undefined;
    instructions.forEach(instruction => {
      this.logger(`stack (json): ${JSON.stringify(this.stack)}`);
      retval = instruction(this.stack, this.context, this);
    });
    this.logger(`done! return value: ${retval}, final stack: ${JSON.stringify(this.stack)}, final context: ${JSON.stringify(this.context)}`);
    return retval;
  }

  getVMInstructions(instructions: Instruction[]) {
    const vmInstructions: InstructionOperation[] = instructions.map(instruction => {
      switch (instruction.type) {
        case "invoke-function-instruction":
          const functionNameToPush = (instruction as InvokeFunctionInstruction).functionName;
          let functionToPush = this.functions[functionNameToPush];
          if (functionToPush === undefined) {
            if (functionNameToPush.startsWith("_")) { // do not throw errors when function name starts with underscore
              const x: FunctionInvocationOperation = () => {
                this.logger(`Missing function got invoked: ${functionNameToPush}!`);
                return null;
              }
              functionToPush = x;
            } else {
              throw new Error(`Cannot find function in function table: ${functionNameToPush}`);
            }
          }
          return functionToPush;
          break;
        case "push-number-instruction":
          return ((stack) => {
            const v = (instruction as PushNumberInstruction).value;
            this.logger(`pushNumber: ${v}`);
            stack.push(v);
            return instruction.value;
          }) as NumberPushOperation;
          break;
        case "push-string-instruction":
          return ((stack) => {
            const v = (instruction as PushStringInstruction).value;
            this.logger(`pushString: ${v}`);
            stack.push(v);
            return instruction.value;
          }) as StringPushOperation;
          break;
        default:
          throw new Error(`Unsupported instruction type!`);
      }
    });
    return vmInstructions;
  }

  loadProgramList(instructions: Instruction[], labelMap?: LabelMap) {
    this.programList = this.getVMInstructions(instructions);
    if (labelMap !== undefined) {
      this.labelMap = labelMap;
    }
  }

  loadVMState(tzoVMState: TzoVMState) {
    this.programList = this.getVMInstructions(tzoVMState.programList);
    this.labelMap = tzoVMState.labelMap;
    this.stack = tzoVMState.stack;
    this.context = tzoVMState.context;
    this.programCounter = tzoVMState.programCounter;
    this.pause = tzoVMState.pause;
    this.exit = tzoVMState.exit;
  }

  setProgramCounter(c: number) {
    this.programCounter = c;
  }

  tick() {
    /**
     * Execute one instruction from program list
     */
    const instruction = this.programList[this.programCounter];
    if (instruction === undefined) {
      this.exit = true;
      return null;
    }
    const oldPC = this.programCounter;
    const retVal = instruction(this.stack, this.context, this);
    if (this.programCounter === oldPC) { // if the program counter did not change, increment by one!
      this.programCounter += 1;
    }
    return retVal;
  }

  run() {
    this.pause = false;
    while (this.exit !== true && this.pause as any !== true) {
      this.tick();
    }
  }
}
