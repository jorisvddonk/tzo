// @ts-nocheck
// Generated from src/grammars/ConciseText.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener.js";

import { InstructionsContext } from "./ConciseTextParser.js";
import { PushNumberContext } from "./ConciseTextParser.js";
import { PushStringContext } from "./ConciseTextParser.js";
import { InvokeFunctionContext } from "./ConciseTextParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ConciseTextParser`.
 */
export interface ConciseTextListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ConciseTextParser.instructions`.
	 * @param ctx the parse tree
	 */
	enterInstructions?: (ctx: InstructionsContext) => void;
	/**
	 * Exit a parse tree produced by `ConciseTextParser.instructions`.
	 * @param ctx the parse tree
	 */
	exitInstructions?: (ctx: InstructionsContext) => void;

	/**
	 * Enter a parse tree produced by `ConciseTextParser.pushNumber`.
	 * @param ctx the parse tree
	 */
	enterPushNumber?: (ctx: PushNumberContext) => void;
	/**
	 * Exit a parse tree produced by `ConciseTextParser.pushNumber`.
	 * @param ctx the parse tree
	 */
	exitPushNumber?: (ctx: PushNumberContext) => void;

	/**
	 * Enter a parse tree produced by `ConciseTextParser.pushString`.
	 * @param ctx the parse tree
	 */
	enterPushString?: (ctx: PushStringContext) => void;
	/**
	 * Exit a parse tree produced by `ConciseTextParser.pushString`.
	 * @param ctx the parse tree
	 */
	exitPushString?: (ctx: PushStringContext) => void;

	/**
	 * Enter a parse tree produced by `ConciseTextParser.invokeFunction`.
	 * @param ctx the parse tree
	 */
	enterInvokeFunction?: (ctx: InvokeFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `ConciseTextParser.invokeFunction`.
	 * @param ctx the parse tree
	 */
	exitInvokeFunction?: (ctx: InvokeFunctionContext) => void;
}

