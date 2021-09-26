// Generated from ../grammars/ConciseText.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u000e|\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0003\u0002\u0003\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\u000b",
    "\u0003\u000b\u0007\u000b=\n\u000b\f\u000b\u000e\u000b@\u000b\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0006\fH",
    "\n\f\r\f\u000e\fI\u0003\f\u0006\fM\n\f\r\f\u000e\fN\u0003\f\u0003\f",
    "\u0003\r\u0005\rT\n\r\u0003\r\u0006\rW\n\r\r\r\u000e\rX\u0003\r\u0005",
    "\r\\\n\r\u0003\r\u0007\r_\n\r\f\r\u000e\rb\u000b\r\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0007\u000eh\n\u000e\f\u000e\u000e\u000e",
    "k\u000b\u000e\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0007",
    "\u000fq\n\u000f\f\u000f\u000e\u000ft\u000b\u000f\u0003\u0010\u0003\u0010",
    "\u0003\u0011\u0006\u0011y\n\u0011\r\u0011\u000e\u0011z\u0003>\u0002",
    "\u0012\u0003\u0002\u0005\u0002\u0007\u0002\t\u0002\u000b\u0003\r\u0004",
    "\u000f\u0005\u0011\u0006\u0013\u0007\u0015\b\u0017\t\u0019\n\u001b\u000b",
    "\u001d\f\u001f\r!\u000e\u0003\u0002\u0007\u0004\u0002\f\f\u000f\u000f",
    "\u0003\u00022;\u0003\u0002$$\u0006\u0002\u000b\f\u000f\u000f\"\"%%\u0005",
    "\u0002\u000b\f\u000f\u000f\"\"\u0002\u0083\u0002\u000b\u0003\u0002\u0002",
    "\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002\u0002",
    "\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002\u0002",
    "\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017\u0003\u0002\u0002",
    "\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001b\u0003\u0002\u0002",
    "\u0002\u0002\u001d\u0003\u0002\u0002\u0002\u0002\u001f\u0003\u0002\u0002",
    "\u0002\u0002!\u0003\u0002\u0002\u0002\u0003#\u0003\u0002\u0002\u0002",
    "\u0005%\u0003\u0002\u0002\u0002\u0007\'\u0003\u0002\u0002\u0002\t*\u0003",
    "\u0002\u0002\u0002\u000b-\u0003\u0002\u0002\u0002\r/\u0003\u0002\u0002",
    "\u0002\u000f1\u0003\u0002\u0002\u0002\u00114\u0003\u0002\u0002\u0002",
    "\u00137\u0003\u0002\u0002\u0002\u0015:\u0003\u0002\u0002\u0002\u0017",
    "E\u0003\u0002\u0002\u0002\u0019S\u0003\u0002\u0002\u0002\u001bc\u0003",
    "\u0002\u0002\u0002\u001dn\u0003\u0002\u0002\u0002\u001fu\u0003\u0002",
    "\u0002\u0002!x\u0003\u0002\u0002\u0002#$\u0007^\u0002\u0002$\u0004\u0003",
    "\u0002\u0002\u0002%&\u0007$\u0002\u0002&\u0006\u0003\u0002\u0002\u0002",
    "\'(\u0005\u0003\u0002\u0002()\u0005\u0005\u0003\u0002)\b\u0003\u0002",
    "\u0002\u0002*+\u0005\u0003\u0002\u0002+,\u0005\u0003\u0002\u0002,\n",
    "\u0003\u0002\u0002\u0002-.\u00071\u0002\u0002.\f\u0003\u0002\u0002\u0002",
    "/0\u0007,\u0002\u00020\u000e\u0003\u0002\u0002\u000212\u0005\u000b\u0006",
    "\u000223\u0005\u000b\u0006\u00023\u0010\u0003\u0002\u0002\u000245\u0005",
    "\u000b\u0006\u000256\u0005\r\u0007\u00026\u0012\u0003\u0002\u0002\u0002",
    "78\u0005\r\u0007\u000289\u0005\u000b\u0006\u00029\u0014\u0003\u0002",
    "\u0002\u0002:>\u0005\u0011\t\u0002;=\u000b\u0002\u0002\u0002<;\u0003",
    "\u0002\u0002\u0002=@\u0003\u0002\u0002\u0002>?\u0003\u0002\u0002\u0002",
    "><\u0003\u0002\u0002\u0002?A\u0003\u0002\u0002\u0002@>\u0003\u0002\u0002",
    "\u0002AB\u0005\u0013\n\u0002BC\u0003\u0002\u0002\u0002CD\b\u000b\u0002",
    "\u0002D\u0016\u0003\u0002\u0002\u0002EG\u0005\u000f\b\u0002FH\n\u0002",
    "\u0002\u0002GF\u0003\u0002\u0002\u0002HI\u0003\u0002\u0002\u0002IG\u0003",
    "\u0002\u0002\u0002IJ\u0003\u0002\u0002\u0002JL\u0003\u0002\u0002\u0002",
    "KM\u0005!\u0011\u0002LK\u0003\u0002\u0002\u0002MN\u0003\u0002\u0002",
    "\u0002NL\u0003\u0002\u0002\u0002NO\u0003\u0002\u0002\u0002OP\u0003\u0002",
    "\u0002\u0002PQ\b\f\u0002\u0002Q\u0018\u0003\u0002\u0002\u0002RT\u0007",
    "/\u0002\u0002SR\u0003\u0002\u0002\u0002ST\u0003\u0002\u0002\u0002TV",
    "\u0003\u0002\u0002\u0002UW\t\u0003\u0002\u0002VU\u0003\u0002\u0002\u0002",
    "WX\u0003\u0002\u0002\u0002XV\u0003\u0002\u0002\u0002XY\u0003\u0002\u0002",
    "\u0002Y[\u0003\u0002\u0002\u0002Z\\\u00070\u0002\u0002[Z\u0003\u0002",
    "\u0002\u0002[\\\u0003\u0002\u0002\u0002\\`\u0003\u0002\u0002\u0002]",
    "_\t\u0003\u0002\u0002^]\u0003\u0002\u0002\u0002_b\u0003\u0002\u0002",
    "\u0002`^\u0003\u0002\u0002\u0002`a\u0003\u0002\u0002\u0002a\u001a\u0003",
    "\u0002\u0002\u0002b`\u0003\u0002\u0002\u0002ci\u0005\u0005\u0003\u0002",
    "dh\u0005\u0007\u0004\u0002eh\u0005\t\u0005\u0002fh\n\u0004\u0002\u0002",
    "gd\u0003\u0002\u0002\u0002ge\u0003\u0002\u0002\u0002gf\u0003\u0002\u0002",
    "\u0002hk\u0003\u0002\u0002\u0002ig\u0003\u0002\u0002\u0002ij\u0003\u0002",
    "\u0002\u0002jl\u0003\u0002\u0002\u0002ki\u0003\u0002\u0002\u0002lm\u0005",
    "\u0005\u0003\u0002m\u001c\u0003\u0002\u0002\u0002nr\n\u0005\u0002\u0002",
    "oq\n\u0006\u0002\u0002po\u0003\u0002\u0002\u0002qt\u0003\u0002\u0002",
    "\u0002rp\u0003\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002s\u001e\u0003",
    "\u0002\u0002\u0002tr\u0003\u0002\u0002\u0002uv\u0007%\u0002\u0002v ",
    "\u0003\u0002\u0002\u0002wy\t\u0006\u0002\u0002xw\u0003\u0002\u0002\u0002",
    "yz\u0003\u0002\u0002\u0002zx\u0003\u0002\u0002\u0002z{\u0003\u0002\u0002",
    "\u0002{\"\u0003\u0002\u0002\u0002\u000e\u0002>INSX[`girz\u0003\b\u0002",
    "\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function ConciseTextLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

ConciseTextLexer.prototype = Object.create(antlr4.Lexer.prototype);
ConciseTextLexer.prototype.constructor = ConciseTextLexer;

Object.defineProperty(ConciseTextLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

ConciseTextLexer.EOF = antlr4.Token.EOF;
ConciseTextLexer.SLASH = 1;
ConciseTextLexer.ASTERISK = 2;
ConciseTextLexer.COMMENT_START = 3;
ConciseTextLexer.ML_COMMENT_BEGIN = 4;
ConciseTextLexer.ML_COMMENT_END = 5;
ConciseTextLexer.MULTILINE_COMMENT = 6;
ConciseTextLexer.COMMENT = 7;
ConciseTextLexer.NUMBER = 8;
ConciseTextLexer.STRING = 9;
ConciseTextLexer.WORD = 10;
ConciseTextLexer.LABEL_START = 11;
ConciseTextLexer.WHITESPACE = 12;

ConciseTextLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

ConciseTextLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

ConciseTextLexer.prototype.literalNames = [ null, "'/'", "'*'", null, null, 
                                            null, null, null, null, null, 
                                            null, "'#'" ];

ConciseTextLexer.prototype.symbolicNames = [ null, "SLASH", "ASTERISK", 
                                             "COMMENT_START", "ML_COMMENT_BEGIN", 
                                             "ML_COMMENT_END", "MULTILINE_COMMENT", 
                                             "COMMENT", "NUMBER", "STRING", 
                                             "WORD", "LABEL_START", "WHITESPACE" ];

ConciseTextLexer.prototype.ruleNames = [ "BACKSLASH", "QUOTE", "ESCAPED_QUOTE", 
                                         "ESCAPED_BACKSLASH", "SLASH", "ASTERISK", 
                                         "COMMENT_START", "ML_COMMENT_BEGIN", 
                                         "ML_COMMENT_END", "MULTILINE_COMMENT", 
                                         "COMMENT", "NUMBER", "STRING", 
                                         "WORD", "LABEL_START", "WHITESPACE" ];

ConciseTextLexer.prototype.grammarFileName = "ConciseText.g4";


exports.ConciseTextLexer = ConciseTextLexer;

