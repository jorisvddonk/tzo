grammar ConciseText;

instructions: (
		pushNumber
		| pushString
		| invokeFunction
		| WHITESPACE
	)* EOF;

pushNumber:
	number = NUMBER (WHITESPACE LABEL_START label = WORD)?;
// note: the quotes at the start and end will have to be stripped off by users!
pushString:
	string = STRING (WHITESPACE LABEL_START label = WORD)?;
invokeFunction:
	opcode = (WORD | ASTERISK) (
		WHITESPACE LABEL_START label = WORD
	)?;

fragment BACKSLASH: '\\';
fragment QUOTE: '"';
fragment ESCAPED_QUOTE: BACKSLASH QUOTE;
fragment ESCAPED_BACKSLASH: BACKSLASH BACKSLASH;
SLASH: '/';
ASTERISK: '*';

COMMENT_START: SLASH SLASH;
ML_COMMENT_BEGIN: SLASH ASTERISK;
ML_COMMENT_END: ASTERISK SLASH;

MULTILINE_COMMENT:
	ML_COMMENT_BEGIN (.)*? ML_COMMENT_END -> skip;
COMMENT: COMMENT_START ~('\r' | '\n')+ WHITESPACE+ -> skip;

NUMBER: '-'? [0-9]+ '.'? [0-9]*;
STRING: QUOTE (ESCAPED_QUOTE | ESCAPED_BACKSLASH | ~'"')* QUOTE;
WORD:
	~('#' | '\t' | '\r' | '\n' | ' ') ~('\t' | '\r' | '\n' | ' ')*;
LABEL_START: '#';

WHITESPACE: ('\t' | '\r' | '\n' | ' ')+;
