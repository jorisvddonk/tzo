import u from "unist-builder";
import { Instruction } from "../interfaces";
import { InvokeFunctionInstruction, LabelMap, PushNumberInstruction, PushStringInstruction } from "../index";
import { ConciseTextLexer } from "../concisetext/ConciseTextLexer";
import { ConciseTextParser } from "../concisetext/ConciseTextParser";
import { ConciseTextListener } from "../concisetext/ConciseTextListener";
import antlr4 from 'antlr4';

const stringPushOperationRegexp = /^\"(.+)\"$/;
const numberPushOperationRegexp = /^(-?[0-9]+)$/;
const functionInvocationOperationRegexp = /^(\S+)$/;
const labelInstructionRegexp = /^\#(\S+)$/;

export const pushNumber: (val: number, comment?: string) => PushNumberInstruction = (val, comment) => {
  return u("push-number-instruction", { value: val, comment });
};
export const pushString: (val: string, comment?: string) => PushStringInstruction = (val, comment) => {
  return u("push-string-instruction", { value: val, comment });
};
export const invokeFunction: (name: string, comment?: string) => InvokeFunctionInstruction = (name, comment) => {
  return u("invoke-function-instruction", { functionName: name, comment });
};

export class Tokenizer {

  parse(codeBlock: string) {
    function getTree(input: string) {
      let inputStream = new antlr4.InputStream(input);
      let lexer = new ConciseTextLexer(inputStream);
      let tokenStream = new antlr4.CommonTokenStream(lexer);
      let parser = new ConciseTextParser(tokenStream);
      return parser.instructions();
    }

    class Listener extends ConciseTextListener {
      public instructions: Instruction[] = [];
      private lastInstruction: Instruction = null;

      enterInstructions(context) {
        this.lastInstruction = {
          functionName: null,
          type: null,
          value: null,
          comment: null,
          label: null
        }
      }

      enterPushNumber(context) {
        this.lastInstruction = pushNumber(parseInt(context.number.text));
        this.lastInstruction.label = context.label ? context.label.text : undefined
      }

      enterPushString(context) {
        const str = context.string.text;
        this.lastInstruction = pushString(str.substr(1, str.length - 2));
        this.lastInstruction.label = context.label ? context.label.text : undefined
      }

      enterInvokeFunction(context) {
        this.lastInstruction = invokeFunction(context.opcode.text);
        this.lastInstruction.label = context.label ? context.label.text : undefined
      }

      exitPushNumber() {
        this.instructions.push(this.lastInstruction);
        this.lastInstruction = null;
      }

      exitPushString() {
        this.instructions.push(this.lastInstruction);
        this.lastInstruction = null;
      }

      exitInvokeFunction() {
        this.instructions.push(this.lastInstruction);
        this.lastInstruction = null;
      }

      getInstructions() {
        return this.instructions;
      }
    }

    const listener = new Listener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, getTree(codeBlock));
    return listener.getInstructions();
  }

  /**
   * @deprecated - use `parse()` instead
   * @param codeBlock 
   * @returns 
   */
  tokenize(codeBlock: string) {
    let parsing: "string" | null = null;
    let partial_parse = "";
    let i = 0;
    const tokens: string[] = [];

    function addTokenMaybe() {
      if (partial_parse.length > 0) {
        tokens.push(partial_parse);
        partial_parse = "";
      }
    }

    while (true) {
      const c = codeBlock[i];
      if (c === '"') { // todo: add escape support ( \" )
        if (parsing === "string") {
          parsing = null;
          partial_parse = `${partial_parse}${c}`;
          i += 1;
          addTokenMaybe();
          continue;
        } else if (parsing === null) {
          parsing = "string";
          partial_parse = `${partial_parse}${c}`;
          i += 1;
          continue;
        }
      }

      if (parsing === "string") {
        partial_parse = `${partial_parse}${c}`;
        i += 1;
        continue;
      }

      if (c === undefined) {
        addTokenMaybe();
        break;
      }

      if (c.match(/\s/) !== null) {
        addTokenMaybe();
        i += 1;
        continue;
      }

      partial_parse = `${partial_parse}${c}`;
      i += 1;
    }

    return tokens;
  }

  /**
   * @deprecated - use `parse()` instead
   * @param codeBlock 
   * @returns 
   */
  transform(tokens: string[]) {
    /**
     * Parse a list of tokens into a list of Instructions
     */
    const labelMap: LabelMap = {};
    let i = -1;
    const instructions: Instruction[] = tokens.map(token => {
      const matchLabelInstruction = token.match(labelInstructionRegexp);
      if (matchLabelInstruction !== null) {
        const label = matchLabelInstruction[1];
        labelMap[label] = i;
        return undefined;
      }

      i += 1;

      const matchStringPushOp = token.match(stringPushOperationRegexp);
      if (matchStringPushOp !== null) {
        const stringToPush = matchStringPushOp[1];
        return pushString(stringToPush);
      }

      const matchNumberPushOp = token.match(numberPushOperationRegexp);
      if (matchNumberPushOp !== null) {
        const numberToPush = parseInt(matchNumberPushOp[1]);
        return pushNumber(numberToPush);
      }

      const matchFunctionInvocationOp = token.match(functionInvocationOperationRegexp);
      if (matchFunctionInvocationOp !== null) {
        const functionNameToPush = matchFunctionInvocationOp[1];
        return invokeFunction(functionNameToPush);
      }

      throw new Error(`Could not parse token: \`${token}\``);
    }).filter(instr => instr !== undefined);

    Object.entries(labelMap).forEach(entry => {
      instructions[entry[1]].label = entry[0];
    });

    return instructions;
  }
}
