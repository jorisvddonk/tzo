import debug from "debug";
import { Context, FunctionInvocationOperation, Functions, Instruction, InstructionOperation, Instructions, instructiontype, InvokeFunctionInstruction, LabelMap, NumberPushOperation, PushNumberInstruction, PushStringInstruction, Stack, StringPushOperation, TzoVMState } from "./interfaces";

const logger = debug("tzo-vm");

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
  "randInt": (stack: Stack) => {
    const [max] = getStackParams("randInt", ["number"], stack) as [number];
    const retval = Math.floor(Math.random() * max);
    stack.push(retval);
    return retval;
  },
  "charCode": (stack: Stack) => {
    const [num] = getStackParams("charCode", ["number"], stack) as [number];
    const retval = String.fromCharCode(num);
    stack.push(retval);
    return retval;
  },
  "+": (stack: Stack) => {
    const [num1, num2] = getStackParams("+", ["number", "number"], stack) as [number, number];
    const retval = num1 + num2;
    stack.push(retval);
    return retval;
  },
  "-": (stack: Stack) => {
    const [num1, num2] = getStackParams("-", ["number", "number"], stack) as [number, number];
    const retval = num1 - num2;
    stack.push(retval);
    return retval;
  },
  "*": (stack: Stack) => {
    const [num1, num2] = getStackParams("*", ["number", "number"], stack) as [number, number];
    const retval = num1 * num2;
    stack.push(retval);
    return retval;
  },
  "concat": (stack: Stack) => {
    const [str1, str2] = getStackParams("concat", ["string", "string"], stack) as [string, string];
    const retval = `${str1}${str2}`;
    stack.push(retval);
    return retval;
  },
  "rconcat": (stack: Stack) => {
    const [str1, str2] = getStackParams("rconcat", ["string", "string"], stack) as [string, string];
    const retval = `${str2}${str1}`;
    stack.push(retval);
    return retval;
  },
  "getContext": (stack: Stack, context: Context) => {
    const [str1] = getStackParams("getContext", ["string"], stack) as [string];
    const retval = context[str1];
    if (retval === null || retval === undefined) {
      throw new Error(`getContext: null/undefined can not be pushed to the context! StackParam: ${str1}`);
    }
    stack.push(retval);
    return retval;
  },
  "setContext": (stack: Stack, context: Context) => {
    const [str1, arg2] = getStackParams("setContext", ["string", "string | number"], stack) as [string, string | number];
    context[str1] = arg2;
    return null;
  },
  "gt": (stack: Stack, context: Context) => {
    const [num1, num2] = getStackParams("gt", ["number", "number"], stack) as [number, number];
    const retval = num1 > num2 ? 1 : 0;
    stack.push(retval);
    return retval;
  },
  "lt": (stack: Stack, context: Context) => {
    const [num1, num2] = getStackParams("lt", ["number", "number"], stack) as [number, number];
    const retval = num1 < num2 ? 1 : 0;
    stack.push(retval);
    return retval;
  },
  "eq": (stack: Stack, context: Context) => {
    const [val1, val2] = getStackParams("eq", ["string | number", "string | number"], stack) as [string | number, string | number];
    const retval = val1 === val2 ? 1 : 0;
    stack.push(retval);
    return retval;
  },
  "jgz": (stack: Stack, context: Context, vm: VM) => { // jump (skip next instruction) if stack.pop() is greater than zero
    const [num1] = getStackParams("jgz", ["number"], stack) as [number];
    if (num1 > 0) {
      vm.programCounter += 2; // it would normally already jump one, but since we modify it won't and we have to jump over ourselves
    }
    return null;
  },
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

  constructor(initialContext: Context, additionalFunctions: Functions = {}) {
    this.context = initialContext;
    const openBraceFunction = (stack: Stack, context: Context, vm: VM) => { // jump to matching brace (source): push current programCounter plus one to stack, then jump to matching brace
      vm.stack.push(vm.programCounter + 1);
      let i = 0;
      let pc = vm.programCounter + 1;
      while (true) {
        if (vm.programList[pc] === openBraceFunction) {
          i += 1;
        }
        if (vm.programList[pc] === closeBraceFunction) {
          i -= 1;
          if (i === -1) {
            vm.programCounter = pc + 1;
            break;
          }
        }
        pc += 1;
      }
      return null;
    };
    const closeBraceFunction = (stack: Stack) => { // jump to matching brace (target))
      return null; // do nothing. We support "executing" these so that we can have if/else statements
    }
    this.functions = {
      ...std_functions, ...additionalFunctions, ...{
        "goto": (stack: Stack) => {
          const [str1] = getStackParams("goto", ["string"], stack) as [string];
          const newPC = this.labelMap[str1];
          if (newPC === undefined) {
            throw new Error(`goto: attempting to jump to undefined label ${str1}`);
          }
          logger(`goto: setting pC to ${newPC} `);
          this.programCounter = newPC;
          return null;
        },
        "exit": (stack: Stack) => {
          this.exit = true;
          return null;
        },
        "{": openBraceFunction,
        "}": closeBraceFunction
      }
    };
  }

  invoke(instructions: Instructions) {
    logger("invoking!");
    let retval: ReturnType<InstructionOperation> = undefined;
    instructions.forEach(instruction => {
      logger(`stack (json): ${JSON.stringify(this.stack)}`);
      retval = instruction(this.stack, this.context, this);
    });
    logger(`done! return value: ${retval}, final stack: ${JSON.stringify(this.stack)}, final context: ${JSON.stringify(this.context)}`);
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
                logger(`Missing function got invoked: ${functionNameToPush}!`);
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
            logger(`pushNumber: ${v}`);
            stack.push(v);
            return instruction.value;
          }) as NumberPushOperation;
          break;
        case "push-string-instruction":
          return ((stack) => {
            const v = (instruction as PushStringInstruction).value;
            logger(`pushString: ${v}`);
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

  loadProgramList(instructions: Instruction[]) {
    this.programList = this.getVMInstructions(instructions);
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
