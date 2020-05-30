let fs = require("fs");
function promisifyFs(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            resolve(data);
        })
    })
}
let f1ReadPromise = fs.promises.readFile("../../f1.txt");
let f2ReadPromise = fs.promises.readFile("../../f2.txt");
let f3ReadPromise = fs.promises.readFile("../../f3.txt");
// let f4ReadPromise = promisifyFs("../../f4.txt");
let f4ReadPromise = fs.promises.readFile("../../f4.txt");

f1ReadPromise.then(function (data) {
    console.log(data + " ");
    
})
f2ReadPromise.then(function (data) {
    console.log(data + " ");
})
f3ReadPromise.then(function (data) {
    console.log(data + " ");
})
f4ReadPromise.then(function (data) {
    console.log(data + " ");
})
