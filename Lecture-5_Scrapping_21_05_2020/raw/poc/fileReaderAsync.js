// Nodejs=> default async 
let fs = require("fs");
console.log("Line number 3 started reading file");
// serial code 
// fs.readFile("index.txt", function (err, content) {
//     console.log("Inside callback");
//     console.log(content + " ");
//     console.log("All content read");
//     fs.readFile("index2.txt", function (err, content) {
//         console.log("Second file data");
//         console.log(content + " ");
//     })
// })
// parallel
console.log("Before");
fs.readFile("index.txt", function (err, content) {
    console.log("First File data");
    console.log(content + " ");
    console.log("All content read");
})
fs.readFile("index2.txt", function (err, content) {
    console.log("Second file data");
    console.log(content + " ");
})
console.log("After");
// console.log(" Line number 10 I can do other things");
// console.log(" Line number 11 I can do other things");
// console.log(" Line number 12 I can do other things");
// console.log(" Line number 13 I can do other things");
// console.log(" Line number 14 I can do other things");
// let data = fs.readFileSync("index2.txt");
// console.log("Line number 12 " + data + " ");
