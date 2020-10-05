grammar ConciseText;

instructions: (pushNumber | pushString | invokeFunction)*;

pushNumber: NUMBER LABEL? (WHITESPACE | EOF);
pushString: STRING LABEL? (WHITESPACE | EOF);
invokeFunction: OPCODE LABEL? (WHITESPACE | EOF);

fragment BACKSLASH: '\\';
fragment QUOTE: '"';
fragment ESCAPED_QUOTE: BACKSLASH QUOTE;
fragment ESCAPED_BACKSLASH: BACKSLASH BACKSLASH;

NUMBER: '-'? [0-9]+ '.'? [0-9]*;
STRING: QUOTE (ESCAPED_QUOTE | ESCAPED_BACKSLASH | ~'"')* QUOTE;
OPCODE: ~'#' ~('\t' | '\r' | '\n' | ' ')*;
LABEL: '#' ~('\t' | '\r' | '\n' | ' ')*;

WHITESPACE: ('\t' | '\r' | '\n' | ' ')+;
