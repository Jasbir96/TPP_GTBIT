// DS ,DEV=> Synchronous=> run till completion
let fs = require("fs");
console.log("reading file");
// stuck =>wait 
// 1gb => read => you need to wait untill whole file is read
let content = fs.readFileSync("index.txt");
console.log(content + " ");
console.log("All content read");
console.log("MeanWhile i can't do anything");