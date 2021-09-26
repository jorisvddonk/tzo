// Generated from ../grammars/ConciseText.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by ConciseTextParser.
function ConciseTextListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

ConciseTextListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
ConciseTextListener.prototype.constructor = ConciseTextListener;

// Enter a parse tree produced by ConciseTextParser#instructions.
ConciseTextListener.prototype.enterInstructions = function(ctx) {
};

// Exit a parse tree produced by ConciseTextParser#instructions.
ConciseTextListener.prototype.exitInstructions = function(ctx) {
};


// Enter a parse tree produced by ConciseTextParser#pushNumber.
ConciseTextListener.prototype.enterPushNumber = function(ctx) {
};

// Exit a parse tree produced by ConciseTextParser#pushNumber.
ConciseTextListener.prototype.exitPushNumber = function(ctx) {
};


// Enter a parse tree produced by ConciseTextParser#pushString.
ConciseTextListener.prototype.enterPushString = function(ctx) {
};

// Exit a parse tree produced by ConciseTextParser#pushString.
ConciseTextListener.prototype.exitPushString = function(ctx) {
};


// Enter a parse tree produced by ConciseTextParser#invokeFunction.
ConciseTextListener.prototype.enterInvokeFunction = function(ctx) {
};

// Exit a parse tree produced by ConciseTextParser#invokeFunction.
ConciseTextListener.prototype.exitInvokeFunction = function(ctx) {
};



exports.ConciseTextListener = ConciseTextListener;