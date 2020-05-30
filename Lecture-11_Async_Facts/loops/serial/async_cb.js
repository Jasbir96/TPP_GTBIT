let fs = require("fs");
let files = ["f1.txt", "f2.txt", "f3.txt", "f4.txt"];
console.log("Before");

function fileReader(i) {
    if (i == files.length) return;
    fs.readFile(`../../${files[i]}`, function (err, data) {
        console.log(data + " ");
        console.log("file reader will be called")
        fileReader(i + 1)
    })
}
fileReader(0);