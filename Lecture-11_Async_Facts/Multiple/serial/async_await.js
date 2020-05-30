let fs = require("fs");
console.log("Reading started");
console.log("Cpu Stuck");
console.log("Doing Extra work");
(async function () {
    let f1ReadPromise = fs.promises.readFile("../../f1.txt");
    let data = await f1ReadPromise;
    console.log(data + " ");
    data = await fs.promises.readFile("../../f2.txt");
    console.log(data + " ");
    data = await fs.promises.readFile("../../f3.txt");
    console.log(data + " ");
    data = await fs.promises.readFile("../../f4.txt");
    console.log(data + " ");
})();