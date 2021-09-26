// Generated from ../grammars/ConciseText.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var ConciseTextListener = require('./ConciseTextListener').ConciseTextListener;
var grammarFileName = "ConciseText.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u000e(\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0007\u0002\u000f\n\u0002\f\u0002\u000e\u0002\u0012\u000b\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0005\u0003\u001a\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0005\u0004 \n\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0005\u0005&\n\u0005\u0003\u0005\u0002\u0002\u0006\u0002\u0004",
    "\u0006\b\u0002\u0003\u0004\u0002\u0004\u0004\f\f\u0002*\u0002\u0010",
    "\u0003\u0002\u0002\u0002\u0004\u0015\u0003\u0002\u0002\u0002\u0006\u001b",
    "\u0003\u0002\u0002\u0002\b!\u0003\u0002\u0002\u0002\n\u000f\u0005\u0004",
    "\u0003\u0002\u000b\u000f\u0005\u0006\u0004\u0002\f\u000f\u0005\b\u0005",
    "\u0002\r\u000f\u0007\u000e\u0002\u0002\u000e\n\u0003\u0002\u0002\u0002",
    "\u000e\u000b\u0003\u0002\u0002\u0002\u000e\f\u0003\u0002\u0002\u0002",
    "\u000e\r\u0003\u0002\u0002\u0002\u000f\u0012\u0003\u0002\u0002\u0002",
    "\u0010\u000e\u0003\u0002\u0002\u0002\u0010\u0011\u0003\u0002\u0002\u0002",
    "\u0011\u0013\u0003\u0002\u0002\u0002\u0012\u0010\u0003\u0002\u0002\u0002",
    "\u0013\u0014\u0007\u0002\u0002\u0003\u0014\u0003\u0003\u0002\u0002\u0002",
    "\u0015\u0019\u0007\n\u0002\u0002\u0016\u0017\u0007\u000e\u0002\u0002",
    "\u0017\u0018\u0007\r\u0002\u0002\u0018\u001a\u0007\f\u0002\u0002\u0019",
    "\u0016\u0003\u0002\u0002\u0002\u0019\u001a\u0003\u0002\u0002\u0002\u001a",
    "\u0005\u0003\u0002\u0002\u0002\u001b\u001f\u0007\u000b\u0002\u0002\u001c",
    "\u001d\u0007\u000e\u0002\u0002\u001d\u001e\u0007\r\u0002\u0002\u001e",
    " \u0007\f\u0002\u0002\u001f\u001c\u0003\u0002\u0002\u0002\u001f \u0003",
    "\u0002\u0002\u0002 \u0007\u0003\u0002\u0002\u0002!%\t\u0002\u0002\u0002",
    "\"#\u0007\u000e\u0002\u0002#$\u0007\r\u0002\u0002$&\u0007\f\u0002\u0002",
    "%\"\u0003\u0002\u0002\u0002%&\u0003\u0002\u0002\u0002&\t\u0003\u0002",
    "\u0002\u0002\u0007\u000e\u0010\u0019\u001f%"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'/'", "'*'", null, null, null, null, null, null, 
                     null, null, "'#'" ];

var symbolicNames = [ null, "SLASH", "ASTERISK", "COMMENT_START", "ML_COMMENT_BEGIN", 
                      "ML_COMMENT_END", "MULTILINE_COMMENT", "COMMENT", 
                      "NUMBER", "STRING", "WORD", "LABEL_START", "WHITESPACE" ];

var ruleNames =  [ "instructions", "pushNumber", "pushString", "invokeFunction" ];

function ConciseTextParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

ConciseTextParser.prototype = Object.create(antlr4.Parser.prototype);
ConciseTextParser.prototype.constructor = ConciseTextParser;

Object.defineProperty(ConciseTextParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

ConciseTextParser.EOF = antlr4.Token.EOF;
ConciseTextParser.SLASH = 1;
ConciseTextParser.ASTERISK = 2;
ConciseTextParser.COMMENT_START = 3;
ConciseTextParser.ML_COMMENT_BEGIN = 4;
ConciseTextParser.ML_COMMENT_END = 5;
ConciseTextParser.MULTILINE_COMMENT = 6;
ConciseTextParser.COMMENT = 7;
ConciseTextParser.NUMBER = 8;
ConciseTextParser.STRING = 9;
ConciseTextParser.WORD = 10;
ConciseTextParser.LABEL_START = 11;
ConciseTextParser.WHITESPACE = 12;

ConciseTextParser.RULE_instructions = 0;
ConciseTextParser.RULE_pushNumber = 1;
ConciseTextParser.RULE_pushString = 2;
ConciseTextParser.RULE_invokeFunction = 3;


function InstructionsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ConciseTextParser.RULE_instructions;
    return this;
}

InstructionsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InstructionsContext.prototype.constructor = InstructionsContext;

InstructionsContext.prototype.EOF = function() {
    return this.getToken(ConciseTextParser.EOF, 0);
};

InstructionsContext.prototype.pushNumber = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(PushNumberContext);
    } else {
        return this.getTypedRuleContext(PushNumberContext,i);
    }
};

InstructionsContext.prototype.pushString = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(PushStringContext);
    } else {
        return this.getTypedRuleContext(PushStringContext,i);
    }
};

InstructionsContext.prototype.invokeFunction = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(InvokeFunctionContext);
    } else {
        return this.getTypedRuleContext(InvokeFunctionContext,i);
    }
};

InstructionsContext.prototype.WHITESPACE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(ConciseTextParser.WHITESPACE);
    } else {
        return this.getToken(ConciseTextParser.WHITESPACE, i);
    }
};


InstructionsContext.prototype.enterRule = function(listener) {
    if(listener instanceof ConciseTextListener ) {
        listener.enterInstructions(this);
	}
};

InstructionsContext.prototype.exitRule = function(listener) {
    if(listener instanceof ConciseTextListener ) {
        listener.exitInstructions(this);
	}
};




ConciseTextParser.InstructionsContext = InstructionsContext;

ConciseTextParser.prototype.instructions = function() {

    var localctx = new InstructionsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, ConciseTextParser.RULE_instructions);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 14;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << ConciseTextParser.ASTERISK) | (1 << ConciseTextParser.NUMBER) | (1 << ConciseTextParser.STRING) | (1 << ConciseTextParser.WORD) | (1 << ConciseTextParser.WHITESPACE))) !== 0)) {
            this.state = 12;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case ConciseTextParser.NUMBER:
                this.state = 8;
                this.pushNumber();
                break;
            case ConciseTextParser.STRING:
                this.state = 9;
                this.pushString();
                break;
            case ConciseTextParser.ASTERISK:
            case ConciseTextParser.WORD:
                this.state = 10;
                this.invokeFunction();
                break;
            case ConciseTextParser.WHITESPACE:
                this.state = 11;
                this.match(ConciseTextParser.WHITESPACE);
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 16;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 17;
        this.match(ConciseTextParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function PushNumberContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ConciseTextParser.RULE_pushNumber;
    this.number = null; // Token
    this.label = null; // Token
    return this;
}

PushNumberContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PushNumberContext.prototype.constructor = PushNumberContext;

PushNumberContext.prototype.NUMBER = function() {
    return this.getToken(ConciseTextParser.NUMBER, 0);
};

PushNumberContext.prototype.WHITESPACE = function() {
    return this.getToken(ConciseTextParser.WHITESPACE, 0);
};

PushNumberContext.prototype.LABEL_START = function() {
    return this.getToken(ConciseTextParser.LABEL_START, 0);
};

PushNumberContext.prototype.WORD = function() {
    return this.getToken(ConciseTextParser.WORD, 0);
};

PushNumberContext.prototype.enterRule = function(listener) {
    if(listener instanceof ConciseTextListener ) {
        listener.enterPushNumber(this);
	}
};

PushNumberContext.prototype.exitRule = function(listener) {
    if(listener instanceof ConciseTextListener ) {
        listener.exitPushNumber(this);
	}
};




ConciseTextParser.PushNumberContext = PushNumberContext;

ConciseTextParser.prototype.pushNumber = function() {

    var localctx = new PushNumberContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, ConciseTextParser.RULE_pushNumber);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 19;
        localctx.number = this.match(ConciseTextParser.NUMBER);
        this.state = 23;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        if(la_===1) {
            this.state = 20;
            this.match(ConciseTextParser.WHITESPACE);
            this.state = 21;
            this.match(ConciseTextParser.LABEL_START);
            this.state = 22;
            localctx.label = this.match(ConciseTextParser.WORD);

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function PushStringContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ConciseTextParser.RULE_pushString;
    this.string = null; // Token
    this.label = null; // Token
    return this;
}

PushStringContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PushStringContext.prototype.constructor = PushStringContext;

PushStringContext.prototype.STRING = function() {
    return this.getToken(ConciseTextParser.STRING, 0);
};

PushStringContext.prototype.WHITESPACE = function() {
    return this.getToken(ConciseTextParser.WHITESPACE, 0);
};

PushStringContext.prototype.LABEL_START = function() {
    return this.getToken(ConciseTextParser.LABEL_START, 0);
};

PushStringContext.prototype.WORD = function() {
    return this.getToken(ConciseTextParser.WORD, 0);
};

PushStringContext.prototype.enterRule = function(listener) {
    if(listener instanceof ConciseTextListener ) {
        listener.enterPushString(this);
	}
};

PushStringContext.prototype.exitRule = function(listener) {
    if(listener instanceof ConciseTextListener ) {
        listener.exitPushString(this);
	}
};




ConciseTextParser.PushStringContext = PushStringContext;

ConciseTextParser.prototype.pushString = function() {

    var localctx = new PushStringContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, ConciseTextParser.RULE_pushString);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 25;
        localctx.string = this.match(ConciseTextParser.STRING);
        this.state = 29;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
        if(la_===1) {
            this.state = 26;
            this.match(ConciseTextParser.WHITESPACE);
            this.state = 27;
            this.match(ConciseTextParser.LABEL_START);
            this.state = 28;
            localctx.label = this.match(ConciseTextParser.WORD);

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function InvokeFunctionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ConciseTextParser.RULE_invokeFunction;
    this.opcode = null; // Token
    this.label = null; // Token
    return this;
}

InvokeFunctionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InvokeFunctionContext.prototype.constructor = InvokeFunctionContext;

InvokeFunctionContext.prototype.WORD = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(ConciseTextParser.WORD);
    } else {
        return this.getToken(ConciseTextParser.WORD, i);
    }
};


InvokeFunctionContext.prototype.ASTERISK = function() {
    return this.getToken(ConciseTextParser.ASTERISK, 0);
};

InvokeFunctionContext.prototype.WHITESPACE = function() {
    return this.getToken(ConciseTextParser.WHITESPACE, 0);
};

InvokeFunctionContext.prototype.LABEL_START = function() {
    return this.getToken(ConciseTextParser.LABEL_START, 0);
};

InvokeFunctionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ConciseTextListener ) {
        listener.enterInvokeFunction(this);
	}
};

InvokeFunctionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ConciseTextListener ) {
        listener.exitInvokeFunction(this);
	}
};




ConciseTextParser.InvokeFunctionContext = InvokeFunctionContext;

ConciseTextParser.prototype.invokeFunction = function() {

    var localctx = new InvokeFunctionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, ConciseTextParser.RULE_invokeFunction);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 31;
        localctx.opcode = this._input.LT(1);
        _la = this._input.LA(1);
        if(!(_la===ConciseTextParser.ASTERISK || _la===ConciseTextParser.WORD)) {
            localctx.opcode = this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
        this.state = 35;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
        if(la_===1) {
            this.state = 32;
            this.match(ConciseTextParser.WHITESPACE);
            this.state = 33;
            this.match(ConciseTextParser.LABEL_START);
            this.state = 34;
            localctx.label = this.match(ConciseTextParser.WORD);

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.ConciseTextParser = ConciseTextParser;
