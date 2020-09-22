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

To be specified.

# Opcodes

To be specified. See `src/opcodes` for the current set of suggested opcodes.
