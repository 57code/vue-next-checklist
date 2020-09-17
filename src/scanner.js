const glob = require("glob");
const fs = require("fs");
const path = require("path");
const policy = require("../policy.json");

const chalk = require("chalk");
const escapeRegExp = require("./escapeRegExp");

function matchLine(line, report, lineNo = 0) {
  policy.forEach((rule) => {
    const reg = new RegExp(escapeRegExp(rule.keyword));
    const isMatch = line.match(reg);
    if (isMatch) {
      report(lineNo, line, rule);
    }
  });
}

function report(lineNo, line, rule) {
  console.log(`  ${lineNo}:\t${line}`);
  console.log(`  ${rule.level}\t${rule.message}`);
  console.log(`  reference Doc:\t${rule.reference}`);
}

module.exports.run = (scanPath = path.resolve("."), pattern = ".{vue,js}") => {
  const list = glob.sync(`${scanPath}/**/*${pattern}`);
  list
    .filter((file) => file.indexOf("node_modules") === -1)
    .forEach((file) => {
      console.log(`Scan: ${path.relative(scanPath, file)}`);
      const source = fs.readFileSync(file).toString();
      const lines = source.split("\n");
      lines.forEach((line, i) => matchLine(line, report, i + 1));
    });
};
module.exports.matchLine = matchLine;

// function printInject(line) {
//   if (/inject: \[/.exec(line)) {
//     return `Inject\t${line}\n`;
//   }
//   return "";
// }

// function printComponent(line) {
//   if (/from 'element-ui\/packages/.exec(line)) {
//     return `Component\t${line}\n`;
//   }
//   return "";
// }
