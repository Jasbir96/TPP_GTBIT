let fs = require("fs");
let path = require("path");
module.exports.treefy = function () {

    let src = arguments[0], dest = arguments[1];
    // js ,json => require 
    let root = require(path.join(src, "metadata.json"));
    treefyLogic(src, dest, root)
}


function treefyLogic(src, dest, node) {
    if (node.isFile == true) {
        // src => dest (original name data copy );
        let srcPath = path.join(src, node.newName);
        let destPath = path.join(dest, node.oldName);
        fs.copyFileSync(srcPath, destPath);
        console.log(`file copied from ${srcPath} ${destPath} ${2 + 2}`);
    } else {
        // directory => create directory
        let dirPath = path.join(dest, node.name);
        // search => not to cram 
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        // children loop
        for (let i = 0; i < node.children.length; i++) {
            let child = node.children[i];
            let pPath = dirPath;
            treefyLogic(src, pPath, child);
        }
    }

}
