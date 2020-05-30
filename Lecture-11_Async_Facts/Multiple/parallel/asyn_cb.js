let fs = require("fs");
console.log("Before ");
fs.readFile("../../f1.txt", function (err, data) {
    console.log(data + " ")
})
fs.readFile("../../f2.txt", function (err, data) {
    console.log(data + " ")

})
fs.readFile("../../f3.txt", function (err, data) {
    console.log(data + " ")

})
fs.readFile("../../f4.txt", function (err, data) {
    console.log(data + " ")

})

console.log("After");