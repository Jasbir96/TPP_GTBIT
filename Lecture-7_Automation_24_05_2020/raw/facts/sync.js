let fs = require("fs");
console.log("Before");
let data = fs.readFileSync("f1.txt","utf-8");
console.log(data);
console.log("After");