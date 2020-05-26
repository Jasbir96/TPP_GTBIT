let fs = require("fs");
// console.log("start");
// promise based function usage 
let fRPromise = fs.promises.readFile("f1.txt");
console.log(fRPromise);
fRPromise.then(function (resolvedValue) {
    console.log(resolvedValue);
})
fRPromise.catch(function (err) {
    console.log(err);
})
setTimeout(function () {
    console.log("I was called after 2 seconds");
    console.log(fRPromise);
}, 2000);