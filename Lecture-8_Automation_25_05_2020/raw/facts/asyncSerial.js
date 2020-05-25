let fs = require("fs");
let files = ["f1.txt", "f2.txt", "f3.txt", "f4.txt", "f5.txt"];
let thenPr = fs.promises.readFile(files[0])
for (let i = 1; i < files.length; i++) {
    thenPr = thenPr.then(function (data) {
        console.log(data + " ");
        return fs.promises.readFile(files[i]);
    })
}
thenPr.then(function(data){
    console.log(data+" ")
})
