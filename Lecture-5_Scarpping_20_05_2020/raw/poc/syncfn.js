let fs = require("fs");
console.log("Before");
function fileReader(path) {
    // console.log(path);
    console.log("Between ");
    fs.readFile(path, function (err, data) {
        console.log("Data inside cb " + data.byteLength);
    })
}
fileReader("index.html");
console.log("After");
// while(true);
