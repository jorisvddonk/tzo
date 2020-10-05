# Tzo 💎 - a simple Virtual Stack Machine

Tzo is a simple Virtual Stack Machine. Its primary use case is to be implemented and embedded in games for a potentially wide variety of use cases. It is the default runtime engine for [QuestMark](https://github.com/jorisvddonk/questmark).

This repository defines:

* The Tzo Virtual Machine and its capabilities and featureset.
* The Tzo Standard Runtime - opcodes that VM implementations are _expected_ to impleemnt.
* One (or more) _representations_ of Tzo VM programs (instruction lists) and Tzo VM State.

This repository furthermore contains:

* A Reference Implementation, in TypeScript.
* Testcases and other reference material.

Note that Tzo is a _hobby project_ that is primarily focused around a single (set of) use case(s). Several language features _may or may not_ be added later on in the future.

# Design goals

* Easy to implement.
* Machine-readable code (JSON) that is somewhat human-readable, and can easily be parsed and minimized to other usecase specific representations when needed (e.g. if a game MUST be super small and compressed, a game programmer can spend some time on a custom bytecode representation of a program listing).
* Easy to compile to / generate code for.
* Easy to extend with extra, use-case-specific functionality (Virtual Opcodes).

# VM 

The Tzo virtual machine is at its core a simple stack machine. All _standard operations_ operate on the stack, not on registers. That said, there _is_ a "Context" available, which acts as a place to store and retrieve keyed values. This is particularly useful for game scripting, as this is where you can store part of your game's state.

Each item on the stack can either be a _number_ (floating point or integer), or a _string_. There are no booleans inherently. The size and precision of numbers is left as an implementation detail. The reference implementation in this repository uses JavaScript's basic number type (64 bit floating point) for all numbers.

# Opcodes

*NOTE*: Even if not explicitly mentioned, all arguments are _always_ popped off the stack, and not pushed back onto it unless otherwise explicitly mentioned.

| opcode(s)    | arguments (rightmost item: top of stack) | argument types              | description                                                                                                                                                                                                                                                                                                                                                                      |
|--------------|------------------------------------------|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `nop`        |                                          |                             | does nothing                                                                                                                                                                                                                                                                                                                                                                     |
| `pop`        |                                          |                             | Pops a value off of the stack, disarding it in the process                                                                                                                                                                                                                                                                                                                       |
| `+` / `plus` | B, A                                     | number, number              | Adds A to B and pushes the result onto the stack                                                                                                                                                                                                                                                                                                                                 |
| `-` / `min`  | B, A                                     | number, number              | Subtracts B from A and pushes the result onto the stack                                                                                                                                                                                                                                                                                                                          |
| `*` / `mul`  | B, A                                     | number, number              | Multiplies B and A and pushes the result onto the stack                                                                                                                                                                                                                                                                                                                          |
| `concat`     | B, A                                     | string, string              | Concatenate A, B and push the result onto the stack.                                                                                                                                                                                                                                                                                                                             |
| `rconcat`    | B, A                                     | string, string              | Concatenate B, A and push the result onto the stack.                                                                                                                                                                                                                                                                                                                             |
| `randInt`    | A                                        | number                      | Generate a random number between 0 (inclusive) and A and push it onto the stack                                                                                                                                                                                                                                                                                                  |
| `charCode`   | A                                        | number                      | Pops A off the stack, gets the corresponding character code, creates a string using said character code and pushes the resulting string onto the stack. The exact definition of how this works are admittedly a weakness in the spec; it is recommended to not using this opcode until this has been clarified or improved.                                                      |
| `ppc`        |                                          |                             | Push the current program counter onto the stack                                                                                                                                                                                                                                                                                                                                  |
| `not`        | A                                        | number                      | Pops A off the stack. If A is 1, push 0 onto the stack. Otherwise, push 1 onto the stack.                                                                                                                                                                                                                                                                                        |
| `or`         | B, A                                     | number, number              | If both A and B are 0, push 0 onto the stack. Otherwise, if either is nonzero, push 1 onto the stack.                                                                                                                                                                                                                                                                            |
| `and`        | B, A                                     | number, number              | If either A or B is 0, push 0 onto the stack. Otherwise, if both are nonzero, push 1 onto the stack.                                                                                                                                                                                                                                                                             |
| `jgz`        | A                                        | number                      | If A is greater than zero, skip ("hop over") the next instruction.                                                                                                                                                                                                                                                                                                               |
| `jz`         | A                                        | number                      | If A is zero, skip ("hop over") the next instruction.                                                                                                                                                                                                                                                                                                                            |
| `gt`         | B, A                                     | number, number              | If A is greater than B, push 1 onto the stack. Otherwise, push 0.                                                                                                                                                                                                                                                                                                                |
| `lt`         | B, A                                     | number, number              | If A is less than B, push 1 onto the stack. Otherwise, push 0.                                                                                                                                                                                                                                                                                                                   |
| `eq`         | B, A                                     | string/number, stringnumber | If A and B are equal (equal value if number, byte-for-byte equal if string), push 1 onto the stack. Otherwise, push 0.                                                                                                                                                                                                                                                           |
| `dup`        | A                                        | string/number               | Pop A off the stack, then push it onto the stack twice.                                                                                                                                                                                                                                                                                                                          |
| `pause`      |                                          |                             | Pause the virtual machine. It will not resume execution until some other process makes it resume execution.                                                                                                                                                                                                                                                                      |
| `exit`       |                                          |                             | Exit (quit) the virtual machine. It will not be allowed to resume execution again.                                                                                                                                                                                                                                                                                               |
| `{`          |                                          |                             | Find the next matching close brace ( `}` ) in the program list, then set the program counter to that close brace's position in the program list plus one. The matching semantics are similar to most programming languages, e.g. if the program counter is 2 and finds a `{` there, there is a `{` at 4, a `}` at 7 and another `}` at 9, the program counter will be set to 10. |
| `}`          |                                          |                             | Does nothing by itself, and acts as a `nop`.                                                                                                                                                                                                                                                                                                                                     |
| `getContext` | A                                        | string                      | Pops A off the stack, then gets the context value pointed to by A and pushes it onto the stack                                                                                                                                                                                                                                                                                   |
| `setContext` | B, A                                     | string/number, string       | Pops A and B off the stack. The context value pointed to by A is set to B                                                                                                                                                                                                                                                                                                        |
| `goto`       | A                                        | string/number               | Pops A off the stack. If it is a number, sets the program counter to that value. If it is a string, looks up the string in the labelmap and sets the program counter to the value found in the label map                                                                                                                                                                         |

# Standard Representation

The Standard Representation of Tzo VM code is a JSON array:

```json
[
  {
    "type": "push-number-instruction",
    "value": 42
  },
  {
    "type": "push-string-instruction",
    "value": "Foo"
  },
  {
    "type": "invoke-function-instruction",
    "functionName": "setContext"
  }
]
```

Though not space-efficient, this is *very* easy to parse in a wide variety of languages, and well-specified. If more space-efficient representations are preferred, custom integrations can be made to allow this.

Comments can be added to add clarification, where needed:

```json
[
  {
    "type": "push-number-instruction",
    "value": 0
  },
  {
    "type": "invoke-function-instruction",
    "functionName": "jgz"
  },
  {
    "type": "invoke-function-instruction",
    "functionName": "{"
  },
  {
    "type": "push-string-instruction",
    "functionName": "hi",
    "comment": "This instruction will never be invoked!"
  },
  {
    "type": "invoke-function-instruction",
    "functionName": "}"
  }
]
```