let fs = require("fs");
// callback  pass
    fs.readFile("f1.txt", function (err, data) {
        if (err) {
            console.log("Error occured");
            console.log(err);
        } else {
            console.log("Read whole data");
            console.log(data + "")
        }
    })



