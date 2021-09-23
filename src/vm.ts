import debug from "debug";
import { Context, FunctionInvocationOperation, Functions, Instruction, InstructionOperation, Instructions, instructiontype, InvokeFunctionInstruction, LabelMap, NumberPushOperation, PushNumberInstruction, PushStringInstruction, Stack, StringPushOperation, TzoVMState } from "./interfaces.js";
import and from "./opcodes/and.js";
import charCode from "./opcodes/charCode.js";
import closeBrace from "./opcodes/closeBrace.js";
import concat from "./opcodes/concat.js";
import delContext from "./opcodes/delContext.js";
import dup from "./opcodes/dup.js";
import eq from "./opcodes/eq.js";
import exit from "./opcodes/exit.js";
import getContext from "./opcodes/getContext.js";
import hasContext from "./opcodes/hasContext.js";
import goto from "./opcodes/goto.js";
import gt from "./opcodes/gt.js";
import jgz from "./opcodes/jgz.js";
import jz from "./opcodes/jz.js";
import lt from "./opcodes/lt.js";
import min from "./opcodes/min.js";
import mul from "./opcodes/mul.js";
import nop from "./opcodes/nop.js";
import not from "./opcodes/not.js";
import openBrace from "./opcodes/openBrace.js";
import or from "./opcodes/or.js";
import pause from "./opcodes/pause.js";
import plus from "./opcodes/plus.js";
import pop from "./opcodes/pop.js";
import ppc from "./opcodes/ppc.js";
import randInt from "./opcodes/randInt.js";
import rconcat from "./opcodes/rconcat.js";
import setContext from "./opcodes/setContext.js";
import stacksize from "./opcodes/stacksize.js";
import stdout from "./opcodes/stdout.js";

export const std_functions: Functions = {
  "randInt": randInt,
  "charCode": charCode,
  "+": plus,
  "plus": plus,
  "-": min,
  "min": min,
  "*": mul,
  "mul": mul,
  "not": not,
  "concat": concat,
  "rconcat": rconcat,
  "getContext": getContext,
  "hasContext": hasContext,
  "setContext": setContext,
  "delContext": delContext,
  "gt": gt,
  "lt": lt,
  "eq": eq,
  "jgz": jgz,
  "jz": jz,
  "exit": exit,
  "pause": pause,
  "goto": goto,
  "{": openBrace,
  "}": closeBrace,
  "ppc": ppc,
  "nop": nop,
  "and": and,
  "or": or,
  "dup": dup,
  "pop": pop,
  "stacksize": stacksize,
  "stdout": stdout,
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

  getVMInstructions(instructions: Instruction[], labelMap?: LabelMap) {
    if (labelMap === undefined) {
      labelMap = {};
    }
    const vmInstructions: InstructionOperation[] = instructions.map((instruction, instrIndex) => {
      if (instruction.label !== undefined) {
        if (labelMap[instruction.label] === undefined) {
          labelMap[instruction.label] = instrIndex;
        } else {
          throw new Error(`label already defined: ${instruction.label}!`);
        }
      }
      switch (instruction.type) {
        case "invoke-function-instruction":
          const functionNameToPush = (instruction as InvokeFunctionInstruction).functionName;
          let functionToPush = this.functions[functionNameToPush];
          if (functionToPush === undefined) {
            if (functionNameToPush.startsWith("_")) { // do not throw errors when function name starts with underscore
              const x: FunctionInvocationOperation = () => {
                this.logger(`Missing function got invoked: ${functionNameToPush}!`);
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
    return { vmInstructions, labelMap };
  }

  loadProgramList(instructions: Instruction[], labelMap?: LabelMap) {
    const parsed_instructions = this.getVMInstructions(instructions, labelMap);
    this.programList = parsed_instructions.vmInstructions;
    this.labelMap = parsed_instructions.labelMap;
  }

  loadVMState(tzoVMState: TzoVMState) {
    const parsed_instructions = this.getVMInstructions(tzoVMState.programList, tzoVMState.labelMap);
    this.programList = parsed_instructions.vmInstructions;
    this.labelMap = parsed_instructions.labelMap;
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
    instruction(this.stack, this.context, this);
    if (this.programCounter === oldPC) { // if the program counter did not change, increment by one!
      this.programCounter += 1;
    }
  }

  run() {
    this.pause = false;
    while (this.exit !== true && this.pause as any !== true) {
      try {
        this.tick();
      } catch (e) {
        const err = new Error(`An error occurred!\nStack: ${this.stack}\nPC: ${this.programCounter}\nContext: ${JSON.stringify(this.context)}\nerr: ${e}`);
        this.logger(err);
        throw err;
      }
    }
  }
}
