
let fs = require("fs");
//Promise lib
function fileReaderP(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(10);
            } else {
                resolve(20);
            }
        })
    })

}
// consumptions code
//initial= Pending 
let fp = fileReaderP("f1.txt");
console.log(fp);
fp.then(function scb() {
    console.log("Inside scb")
}, function fcb() {
    console.log("Inside fcb");
}).then(function scb1() {
    console.log("inside scb1");
}, function fcb1() {
console.log("Iniside fcb1 ")
})
// final
// setTimeout(function () {
//     console.log(fp);
// }, 1000);