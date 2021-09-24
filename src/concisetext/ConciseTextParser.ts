// @ts-nocheck
// Generated from src/grammars/ConciseText.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ConciseTextListener } from "./ConciseTextListener";
import { ConciseTextVisitor } from "./ConciseTextVisitor";


export class ConciseTextParser extends Parser {
	public static readonly SLASH = 1;
	public static readonly ASTERISK = 2;
	public static readonly COMMENT_START = 3;
	public static readonly ML_COMMENT_BEGIN = 4;
	public static readonly ML_COMMENT_END = 5;
	public static readonly MULTILINE_COMMENT = 6;
	public static readonly COMMENT = 7;
	public static readonly NUMBER = 8;
	public static readonly STRING = 9;
	public static readonly WORD = 10;
	public static readonly LABEL_START = 11;
	public static readonly WHITESPACE = 12;
	public static readonly RULE_instructions = 0;
	public static readonly RULE_pushNumber = 1;
	public static readonly RULE_pushString = 2;
	public static readonly RULE_invokeFunction = 3;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"instructions", "pushNumber", "pushString", "invokeFunction",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'/'", "'*'", undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "'#'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "SLASH", "ASTERISK", "COMMENT_START", "ML_COMMENT_BEGIN", "ML_COMMENT_END", 
		"MULTILINE_COMMENT", "COMMENT", "NUMBER", "STRING", "WORD", "LABEL_START", 
		"WHITESPACE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ConciseTextParser._LITERAL_NAMES, ConciseTextParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ConciseTextParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ConciseText.g4"; }

	// @Override
	public get ruleNames(): string[] { return ConciseTextParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ConciseTextParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ConciseTextParser._ATN, this);
	}
	// @RuleVersion(0)
	public instructions(): InstructionsContext {
		let _localctx: InstructionsContext = new InstructionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ConciseTextParser.RULE_instructions);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 14;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ConciseTextParser.NUMBER) | (1 << ConciseTextParser.STRING) | (1 << ConciseTextParser.WORD) | (1 << ConciseTextParser.WHITESPACE))) !== 0)) {
				{
				this.state = 12;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ConciseTextParser.NUMBER:
					{
					this.state = 8;
					this.pushNumber();
					}
					break;
				case ConciseTextParser.STRING:
					{
					this.state = 9;
					this.pushString();
					}
					break;
				case ConciseTextParser.WORD:
					{
					this.state = 10;
					this.invokeFunction();
					}
					break;
				case ConciseTextParser.WHITESPACE:
					{
					this.state = 11;
					this.match(ConciseTextParser.WHITESPACE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 16;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 17;
			this.match(ConciseTextParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pushNumber(): PushNumberContext {
		let _localctx: PushNumberContext = new PushNumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ConciseTextParser.RULE_pushNumber);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 19;
			_localctx._number = this.match(ConciseTextParser.NUMBER);
			this.state = 23;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				this.state = 20;
				this.match(ConciseTextParser.WHITESPACE);
				this.state = 21;
				this.match(ConciseTextParser.LABEL_START);
				this.state = 22;
				_localctx._label = this.match(ConciseTextParser.WORD);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pushString(): PushStringContext {
		let _localctx: PushStringContext = new PushStringContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ConciseTextParser.RULE_pushString);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 25;
			_localctx._string = this.match(ConciseTextParser.STRING);
			this.state = 29;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				this.state = 26;
				this.match(ConciseTextParser.WHITESPACE);
				this.state = 27;
				this.match(ConciseTextParser.LABEL_START);
				this.state = 28;
				_localctx._label = this.match(ConciseTextParser.WORD);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public invokeFunction(): InvokeFunctionContext {
		let _localctx: InvokeFunctionContext = new InvokeFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ConciseTextParser.RULE_invokeFunction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 31;
			_localctx._opcode = this.match(ConciseTextParser.WORD);
			this.state = 35;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				{
				this.state = 32;
				this.match(ConciseTextParser.WHITESPACE);
				this.state = 33;
				this.match(ConciseTextParser.LABEL_START);
				this.state = 34;
				_localctx._label = this.match(ConciseTextParser.WORD);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x0E(\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x07\x02\x0F\n\x02\f\x02\x0E\x02\x12\v\x02\x03\x02\x03\x02\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x05\x03\x1A\n\x03\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x05\x04 \n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05&\n\x05" +
		"\x03\x05\x02\x02\x02\x06\x02\x02\x04\x02\x06\x02\b\x02\x02\x02\x02*\x02" +
		"\x10\x03\x02\x02\x02\x04\x15\x03\x02\x02\x02\x06\x1B\x03\x02\x02\x02\b" +
		"!\x03\x02\x02\x02\n\x0F\x05\x04\x03\x02\v\x0F\x05\x06\x04\x02\f\x0F\x05" +
		"\b\x05\x02\r\x0F\x07\x0E\x02\x02\x0E\n\x03\x02\x02\x02\x0E\v\x03\x02\x02" +
		"\x02\x0E\f\x03\x02\x02\x02\x0E\r\x03\x02\x02\x02\x0F\x12\x03\x02\x02\x02" +
		"\x10\x0E\x03\x02\x02\x02\x10\x11\x03\x02\x02\x02\x11\x13\x03\x02\x02\x02" +
		"\x12\x10\x03\x02\x02\x02\x13\x14\x07\x02\x02\x03\x14\x03\x03\x02\x02\x02" +
		"\x15\x19\x07\n\x02\x02\x16\x17\x07\x0E\x02\x02\x17\x18\x07\r\x02\x02\x18" +
		"\x1A\x07\f\x02\x02\x19\x16\x03\x02\x02\x02\x19\x1A\x03\x02\x02\x02\x1A" +
		"\x05\x03\x02\x02\x02\x1B\x1F\x07\v\x02\x02\x1C\x1D\x07\x0E\x02\x02\x1D" +
		"\x1E\x07\r\x02\x02\x1E \x07\f\x02\x02\x1F\x1C\x03\x02\x02\x02\x1F \x03" +
		"\x02\x02\x02 \x07\x03\x02\x02\x02!%\x07\f\x02\x02\"#\x07\x0E\x02\x02#" +
		"$\x07\r\x02\x02$&\x07\f\x02\x02%\"\x03\x02\x02\x02%&\x03\x02\x02\x02&" +
		"\t\x03\x02\x02\x02\x07\x0E\x10\x19\x1F%";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ConciseTextParser.__ATN) {
			ConciseTextParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ConciseTextParser._serializedATN));
		}

		return ConciseTextParser.__ATN;
	}

}

export class InstructionsContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ConciseTextParser.EOF, 0); }
	public pushNumber(): PushNumberContext[];
	public pushNumber(i: number): PushNumberContext;
	public pushNumber(i?: number): PushNumberContext | PushNumberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PushNumberContext);
		} else {
			return this.getRuleContext(i, PushNumberContext);
		}
	}
	public pushString(): PushStringContext[];
	public pushString(i: number): PushStringContext;
	public pushString(i?: number): PushStringContext | PushStringContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PushStringContext);
		} else {
			return this.getRuleContext(i, PushStringContext);
		}
	}
	public invokeFunction(): InvokeFunctionContext[];
	public invokeFunction(i: number): InvokeFunctionContext;
	public invokeFunction(i?: number): InvokeFunctionContext | InvokeFunctionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InvokeFunctionContext);
		} else {
			return this.getRuleContext(i, InvokeFunctionContext);
		}
	}
	public WHITESPACE(): TerminalNode[];
	public WHITESPACE(i: number): TerminalNode;
	public WHITESPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ConciseTextParser.WHITESPACE);
		} else {
			return this.getToken(ConciseTextParser.WHITESPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ConciseTextParser.RULE_instructions; }
	// @Override
	public enterRule(listener: ConciseTextListener): void {
		if (listener.enterInstructions) {
			listener.enterInstructions(this);
		}
	}
	// @Override
	public exitRule(listener: ConciseTextListener): void {
		if (listener.exitInstructions) {
			listener.exitInstructions(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConciseTextVisitor<Result>): Result {
		if (visitor.visitInstructions) {
			return visitor.visitInstructions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PushNumberContext extends ParserRuleContext {
	public _number!: Token;
	public _label!: Token;
	public NUMBER(): TerminalNode { return this.getToken(ConciseTextParser.NUMBER, 0); }
	public WHITESPACE(): TerminalNode | undefined { return this.tryGetToken(ConciseTextParser.WHITESPACE, 0); }
	public LABEL_START(): TerminalNode | undefined { return this.tryGetToken(ConciseTextParser.LABEL_START, 0); }
	public WORD(): TerminalNode | undefined { return this.tryGetToken(ConciseTextParser.WORD, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ConciseTextParser.RULE_pushNumber; }
	// @Override
	public enterRule(listener: ConciseTextListener): void {
		if (listener.enterPushNumber) {
			listener.enterPushNumber(this);
		}
	}
	// @Override
	public exitRule(listener: ConciseTextListener): void {
		if (listener.exitPushNumber) {
			listener.exitPushNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConciseTextVisitor<Result>): Result {
		if (visitor.visitPushNumber) {
			return visitor.visitPushNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PushStringContext extends ParserRuleContext {
	public _string!: Token;
	public _label!: Token;
	public STRING(): TerminalNode { return this.getToken(ConciseTextParser.STRING, 0); }
	public WHITESPACE(): TerminalNode | undefined { return this.tryGetToken(ConciseTextParser.WHITESPACE, 0); }
	public LABEL_START(): TerminalNode | undefined { return this.tryGetToken(ConciseTextParser.LABEL_START, 0); }
	public WORD(): TerminalNode | undefined { return this.tryGetToken(ConciseTextParser.WORD, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ConciseTextParser.RULE_pushString; }
	// @Override
	public enterRule(listener: ConciseTextListener): void {
		if (listener.enterPushString) {
			listener.enterPushString(this);
		}
	}
	// @Override
	public exitRule(listener: ConciseTextListener): void {
		if (listener.exitPushString) {
			listener.exitPushString(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConciseTextVisitor<Result>): Result {
		if (visitor.visitPushString) {
			return visitor.visitPushString(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InvokeFunctionContext extends ParserRuleContext {
	public _opcode!: Token;
	public _label!: Token;
	public WORD(): TerminalNode[];
	public WORD(i: number): TerminalNode;
	public WORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ConciseTextParser.WORD);
		} else {
			return this.getToken(ConciseTextParser.WORD, i);
		}
	}
	public WHITESPACE(): TerminalNode | undefined { return this.tryGetToken(ConciseTextParser.WHITESPACE, 0); }
	public LABEL_START(): TerminalNode | undefined { return this.tryGetToken(ConciseTextParser.LABEL_START, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ConciseTextParser.RULE_invokeFunction; }
	// @Override
	public enterRule(listener: ConciseTextListener): void {
		if (listener.enterInvokeFunction) {
			listener.enterInvokeFunction(this);
		}
	}
	// @Override
	public exitRule(listener: ConciseTextListener): void {
		if (listener.exitInvokeFunction) {
			listener.exitInvokeFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConciseTextVisitor<Result>): Result {
		if (visitor.visitInvokeFunction) {
			return visitor.visitInvokeFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


