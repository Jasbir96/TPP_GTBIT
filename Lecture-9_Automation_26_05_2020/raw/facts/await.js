let fs = require("fs");
let fileReadPromise = fs.promises.readFile("f12.txt");
console.log("Before");
// IFEE
(async function () {
    try {
        // replacement=> then and catch (syntax sugar)
        let ans = await fileReadPromise;
        console.log(ans + " ");
    } catch (err) {
        console.log("Inisde catch");
        console.log(err.message)
    }

})()

console.log("After");
