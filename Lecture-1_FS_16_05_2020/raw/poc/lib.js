// library file=> function call/ answer  
function lib(number) {
    for (let div = 2; div * div <= number; div++) {
        if (number % div == 0) {
            return false;
        }
    }
    return true
}

// Developer code 
console.log("Number is prime ? " + lib(21));
console.log("Number is prime ? " + lib(23));
//  framework style
let { exec } = require("child_process")
// framework => user=> socket 
function frame(number, scb, fcb) {
    for (let div = 2; div * div <= number; div++) {
        if (number % div == 0) {
            return fcb();
        }
    }
    return scb();
}
// developer code 
function scb() {
    console.log("Number is prime");
    exec("calc").unref();
}
function fcb() {
    console.log("Number is not prime");
    exec("start chrome").unref();
}
// success=> scb
//fail=> fcb
 frame(21, scb, fcb);
frame(23, scb, fcb);
// Jquery => library
// Angular => Framework 