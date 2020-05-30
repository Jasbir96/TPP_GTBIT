let fs = require("fs");
let files = ["f1.txt", "f2.txt", "f3.txt", "f4.txt"];
(async function () {
    let filesArr = [];
    for (let i = 0; i < files.length; i++) {
        let fsReadPromise = fs.promises.readFile(`../../${files[i]}`);
        fsReadPromise.then(function (data) {
            console.log("" + data);
        })
        filesArr.push(fsReadPromise);
    }
    console.log("" + await Promise.all(filesArr));
})(files)