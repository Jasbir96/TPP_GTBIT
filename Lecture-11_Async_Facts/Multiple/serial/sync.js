let fs = require("fs");
console.log("Reading started");
console.log("Cpu Stuck");
// sync function 
let buffer = fs.readFileSync("../../f1.txt");
console.log(buffer + " ");
buffer = fs.readFileSync("../../f2.txt");
console.log(buffer + " ");