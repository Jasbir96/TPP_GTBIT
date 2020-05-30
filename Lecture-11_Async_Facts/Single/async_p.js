let fs = require("fs");
console.log("Reading started");
console.log("Cpu not Stuck");

// promise way
let fReadPromise = fs.promises.readFile("../f1.txt");
fReadPromise.then(function (data) {
    console.log("`````````````````````````````````````");
    console.log("Completed file reading")
    console.log(data + " ");
})
console.log("Running extra work");