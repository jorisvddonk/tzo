import fs from "fs";
import program from "commander";
import { VM } from "./vm.js";
import { Tokenizer } from "./util/tokenizer.js";
import { TzoVMState } from "./interfaces.js";

program
  .version('1.0.8')
  .requiredOption('--input, -i <path>', "Path to Tzo VMState .json or Tzo ConciseText .txt/.tzoct file")
  .parse(process.argv);

let input = [];
let vmState: TzoVMState = {
  context: {},
  exit: false,
  pause: false,
  programCounter: 0,
  labelMap: {},
  programList: [],
  stack: []
};
if (program.I && program.I.endsWith(".json")) {
  vmState = JSON.parse(fs.readFileSync(program.I).toString());
}
if (program.I && (program.I.endsWith(".txt") || program.I.endsWith(".tzoct"))) {
  const input_file = fs.readFileSync(program.I).toString();
  const tokenizer = new Tokenizer();
  vmState.programList = tokenizer.transform(tokenizer.tokenize(input_file));
}

const vm = new VM({});
vm.loadVMState(vmState);
vm.run();
