let fs = require("fs");
console.log("start");
fs.readFile("f12.txt", function (err, data) {
    if (err) {
        console.log(err.message)
    } else {
        console.log(data + " ");

    }
    console.log("finally finished")
})
console.log("move to next work");
