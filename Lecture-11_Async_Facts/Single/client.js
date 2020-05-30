let lib = require("./lib");
let total = 100;
// Inversion of control
// i was using cb based library
// lib.chargeCreditCard("Steve", function () {
//     total = total - 20;
// });

let chargeCreditCardPromise = lib.chargeCreditCard("data");
chargeCreditCardPromise.then(function () {
    total = total - 20;
    console.log(total);
})