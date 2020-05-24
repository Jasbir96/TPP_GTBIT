let fs = require("fs");
// resolve call
// reject call
// Abstarction
function promiseMaker(path) {
    return new Promise(function (resolve, reject) {
        // async work
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(20);

            } else {
                resolve(data);
            }
        })
    })
}
function setTimeoutPromisify() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("I delayed everything by 2 seconds");
        }, 2000);
    })
}
// console.log(fRPromise);
function scb(resolvedValue) {
    console.log("inside  first then");
    console.log(resolvedValue);
    console.log("````````````````````````");
    // return promiseMaker("f2.txt");  
    // return 10;
    let twoSPromise = setTimeoutPromisify();
    return twoSPromise;
}
let fRPromise = promiseMaker("f1.txt");
// p1=> pending 
let promiseFromThen = fRPromise.then(scb)
console.log("Line No 29")
console.log(promiseFromThen);
// p1=> 
promiseFromThen.then(function (data) {
    console.log("Inside second then")
    console.log(data)
})
// fRPromise.catch(function (rejectedValue) {
//     console.log("inside catch");
//     console.log(rejectedValue);
// })
// 
// line no 29
// pending

// iniside 1st then
// data


// I delayed everything by 2 seconds


