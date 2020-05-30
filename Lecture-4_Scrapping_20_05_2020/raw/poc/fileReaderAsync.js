// Nodejs=> default async 
let fs = require("fs");
console.log("started reading file");
fs.readFile("index.txt", function (err, content) {
    console.log(content + " ");
    console.log("All content read");
})
console.log("I can do other things");