let fs = require("fs");
console.log("Reading started");
console.log("Cpu not Stuck");

// asyn await way
(async function () {
    let fReadPromise = fs.promises.readFile("../f1.txt");
    let data = await fReadPromise; 
    console.log("`````````````````````````````````````");
    console.log("Completed file reading")
    console.log(data + " ");
})()

console.log("Running extra work");