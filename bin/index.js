#!/usr/bin/env node
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const log = (content) => console.log(chalk.green(content));
const scanner = require("../src/scanner");
const path = require("path");
const run = async () => {
  // 打印欢迎画面
  clear();
  const data = await figlet("Vue Next CheckList");
  log(data);

  const program = require("commander");
  program.version(require("../package").version);

  program
    .option("--vue", "scan .vue file")
    .option("--js", "scan .js file")
    .option("-p <path>", "scan file path Ex: ./**/*.{vue,js}");

  program.parse(process.argv);
  if (program.p) {
    scanner.run(program.p);
    return;
  }

  if (program.vue && program.js) {
    scanner.run(path.resolve("."), ".{vue,js}");
    return;
  }

  if (program.vue) {
    scanner.run(path.resolve("."), ".vue");
    return;
  }

  if (program.js) {
    scanner.run(path.resolve("."), ".js");
    return;
  }

  scanner.run();
};
run();
