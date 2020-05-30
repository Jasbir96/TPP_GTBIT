let fs = require("fs");
console.log("Reading started");
console.log("Cpu Stuck");
// sync function => nesting 
 fs.readFile("../../f1.txt", function (err, data) {
    console.log(data + " ");
    // cb hell
    fs.readFile("../../f2.txt", function (err, data) {
        console.log(data + " ");
        fs.readFile("../../f3.txt", function (err, data) {
            console.log(data + " ");
            fs.readFile("../../f4.txt", function (err, data) {
                console.log(data + " ")
            })
        })

    });
});
console.log("Doing Extra work");