let fs = require("fs");
let path = require("path");
let uniqid = require('uniqid');
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
function untreefy(src, dest, obj) {
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
            untreefy(childPath, dest, chobj);
            obj.children.push(chobj);
        }
        // children loop
    }
}
// d10 => data=> {name:d10,isFile:false,children:[]}
// f1.txt->abc => data=> {newName:d10,isFile:true,oldName:}
let input = process.argv.slice(2);
// for a single node untreefy is capable to get all the info about that particular node
let root = {};
let src = input[0];
let dest = input[1];
untreefy(src, dest, root);
// console.log(root);
// top cohersion
// write obj => dest ??
fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root));
console.log("Data copied");
// f1.txt