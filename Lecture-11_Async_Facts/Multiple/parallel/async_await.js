let fs = require("fs");
(async function () {
    let f1ReadPromise = fs.promises.readFile("../../f1.txt");
    let data = await f1ReadPromise;
    console.log(data + " ");
})();
    (async function () {
        let f2ReadPromise = fs.promises.readFile("../../f2.txt");
        let data = await f2ReadPromise;
        console.log(data + " ");
    })();
    (async function () {

        let f3ReadPromise = fs.promises.readFile("../../f3.txt");
        let data = await f3ReadPromise;
        console.log(data + " ");
    })();
    (async function () {
        let f4ReadPromise = fs.promises.readFile("../../f4.txt");
        let data = await f4ReadPromise;
        console.log(data + " ");
    })();