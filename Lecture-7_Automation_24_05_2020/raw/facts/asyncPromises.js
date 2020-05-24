let fs = require("fs");
console.log("start");
// promise based function usage 
let fRPromise = fs.promises.readFile("f1.txt");
console.log(fRPromise);
fRPromise.then(function (data) {
    console.log("Inside then");
    console.log(data+" ");
})
fRPromise.catch(function (err) {
    console.log("Inside catch");
    console.log(err.message);
})
console.log("Move to next work");