let fs = require("fs");
console.log("Before");
let files = ["index1.txt", "index2.txt", "index3.txt", "index4.txt", "index5.txt"];

fileReadSerial(files, 0);
function fileReadSerial(files, idx) {
    if (idx == files.length) {
        console.log("All files read");
        return;
    }
    fs.readFile(files[idx], function (err, data) {
        console.log(" " + data);
    })
    fileReadSerial(files, idx + 1);
}
console.log("After");