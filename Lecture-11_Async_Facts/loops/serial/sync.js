let fs = require("fs");
let files = ["f1.txt", "f2.txt", "f3.txt", "f4.txt"];
console.log("Before");
for (let i = 0; i < files.length; i++) {
    let buffer = fs.readFileSync(`../../f${i + 1}.txt`)
    console.log(buffer+" ");
}
console.log("After");