let fs = require("fs");
let path = require("path");
module.exports.view = function view() {
    // console.log("view Command is implemented");
    // console.log(arguments);
    let src = arguments[0], mode = arguments[1];
    if (mode == "-t") {
        viewTree(src, "");
    } else {
        viewFlatFile(src);
    }
}
//  d10=> tree view print
// d10 => flat file view print
// how to check whether a path is file or directory in nodejs ??=> google 
function checkWhetherFile(path_string) {
    return fs.lstatSync(path_string).isFile();
}
// content read directory??=> google
function childReader(src) {
    let children = fs.readdirSync(src);
    return children;
}
// logic
function viewFlatFile(src) {
    // abstraction
    let isFile = checkWhetherFile(src);
    if (isFile == true) {
        console.log(src + "*");
    } else {
        console.log(src);
        // childreader
        let children = childReader(src);
        // console.log(children);
        for (let i = 0; i < children.length; i++) {
            // let childPath = src + "/" + children[i]
            let childPath = path.join(src, children[i]);
            viewFlatFile(childPath);
        }
        // children loop
    }
}
function viewTree(src, indent) {
    // abstraction
    let isFile = checkWhetherFile(src);
    if (isFile == true) {
        // console.log(src + "*");
        console.log(indent + path.basename(src) + "*");
    } else {
        console.log(indent + path.basename(src));
        // childreader
        let children = childReader(src);
        // console.log(children);
        for (let i = 0; i < children.length; i++) {
            // let childPath = src + "/" + children[i]
            let childPath = path.join(src, children[i]);
            viewTree(childPath, indent + "\t");
        }
        // children loop
    }
}