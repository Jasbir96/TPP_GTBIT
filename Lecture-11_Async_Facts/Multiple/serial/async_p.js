let fs = require("fs");
console.log("Reading started");
console.log("Cpu Stuck");
// chaining 
let f1ReadPromise = fs.promises.readFile("../../f1.txt");
f1ReadPromise.then(function (data) {
    console.log(data + " ");
    // cb hell)
    return fs.promises.readFile("../../f2.txt");
}).then(function (data) {
    console.log(data + " ");
    return fs.promises.readFile("../../f3.txt");
}).then(function (data) {
    console.log(data + " ");
    return fs.promises.readFile("../../f4.txt")
}).then(function (data) {
    console.log(data + " ");
})
console.log("Doing Extra work");