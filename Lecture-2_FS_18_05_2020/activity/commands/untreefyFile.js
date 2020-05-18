let fs = require("fs");
let path = require("path");
let uniqid = require('uniqid');
//  d10=> tree view print
// d10 => flat file view print
// how to check whether a path is file or directory in nodejs ??=> google
// for a single node untreefy is capable to get all the info about that particular node
// f1.txt
module.exports.untreefy = function () {
    // console.log(arguments);
    let src = arguments[0], dest = arguments[1];
    let root = {};
    untreefyLogic(src, dest, root)
    // ??
    fs.writeFileSync(path.join(dest, "metadata.json"), JSON.stringify(root));
    console.log("Data copied");
}
function checkWhetherFile(path_string) {
    return fs.lstatSync(path_string).isFile();
}
// content read directory??=> google
function childReader(src) {
    let children = fs.readdirSync(src);
    return children;
}
function untreefyLogic(src, dest, obj) {
    let isFile = checkWhetherFile(src);
    if (isFile == true) {
        let newName = uniqid();
        let oldName = path.basename(src);
        fs.copyFileSync(src, path.join(dest, newName));
        obj.newName = newName;
        obj.oldName = oldName;
        obj.isFile = true;
    } else {

        let dirName = path.basename(src);
        // let obj = {};
        obj.isFile = false;
        obj.name = dirName;
        obj.children = [];
        // isfile,
        // children
        // d10
        let children = childReader(src);
        // [d20,d30,f1.txt]
        // console.log(children);
        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(src, children[i]);
            let chobj = {};
            untreefyLogic(childPath, dest, chobj);
            obj.children.push(chobj);
        }
        // children loop
    }
}
