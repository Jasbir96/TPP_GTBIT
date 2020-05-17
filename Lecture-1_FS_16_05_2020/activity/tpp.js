let viewFile = require("./commands/viewFile");
let untreefyFile = require("./commands/untreefyFile");
let treefyFile = require("./commands/treefyFile");
let helpFile = require("./commands/helpFile");
let input = process.argv.slice(2);
// console.log(input);
let cmd = input[0];
switch (cmd) {
    case "view":
        viewFile.view();
        break;
    case "treefy":
        treefyFile.treefy();
        break;
    case "untreefy":
        untreefyFile.untreefy();
        break;
    case "help":
        helpFile.help();
        break;
    default:
        console.log("Wrong command");
        break;
}