let fs = require("fs");
console.log("Reading started");
console.log("Cpu not Stuck");

// sync function 
fs.readFile("../f1.txt", function (err, data) {
    console.log("`````````````````````````````````````");
    console.log("Completed file reading")
    console.log(data + " ");

});
console.log("Running extra work");