let fs = require("fs");
let files = ["f1.txt", "f2.txt", "f3.txt", "f4.txt"];
function fileReader(i) {
    if (i == files.length) return;
    let fsReadPromise = fs.promises.readFile(`../../${files[i]}`);
    fileReader(i + 1)
    fsReadPromise.then(function (data) {
        console.log(data + " ");
    })
}
fileReader(0);