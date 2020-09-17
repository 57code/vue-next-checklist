const glob = require("glob");
const fs = require("fs");
const path = require("path");
const policy = require("../policy.json");

const escapeRegExp = require("./escapeRegExp");
module.exports.run = (scanPath = path.resolve(".")) => {
  const list = glob.sync(`${scanPath}/**/*.vue`);
  list.forEach((path) => {
    console.log(`####Scan File>>>>> ${path}#####`);
    const source = fs.readFileSync(path).toString();
    const lines = source.split("\n");
    lines.forEach(readLine);
  });
};

function readLine(line) {
  policy.forEach(({ keyword }) => {
    const reg = new RegExp(escapeRegExp(keyword));
    const isMatch = line.match(reg);
    if (isMatch) {
      console.log("line:", line);
    }
  });
}

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
