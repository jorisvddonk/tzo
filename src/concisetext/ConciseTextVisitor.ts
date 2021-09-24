// @ts-nocheck
// Generated from src/grammars/ConciseText.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor.js";

import { InstructionsContext } from "./ConciseTextParser.js";
import { PushNumberContext } from "./ConciseTextParser.js";
import { PushStringContext } from "./ConciseTextParser.js";
import { InvokeFunctionContext } from "./ConciseTextParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ConciseTextParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ConciseTextVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ConciseTextParser.instructions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstructions?: (ctx: InstructionsContext) => Result;

	/**
	 * Visit a parse tree produced by `ConciseTextParser.pushNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPushNumber?: (ctx: PushNumberContext) => Result;

	/**
	 * Visit a parse tree produced by `ConciseTextParser.pushString`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPushString?: (ctx: PushStringContext) => Result;

	/**
	 * Visit a parse tree produced by `ConciseTextParser.invokeFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvokeFunction?: (ctx: InvokeFunctionContext) => Result;
}

