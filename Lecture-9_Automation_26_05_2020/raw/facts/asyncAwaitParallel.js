let fs = require("fs");
let files = ["f1.txt", "f2.txt", "f3.txt", "f4.txt", "f5.txt"];
async function parallelReader(arr, i) {
    if (i == arr.length) {
        return
    }
    let cPromise = fs.promises.readFile(files[i]);
    parallelReader(arr, i + 1);
    let content = await cPromise;
    console.log(content + " ");
}
parallelReader(files, 0);