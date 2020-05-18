let root = {
    data: "d10",
    children: [{
        data: "d20",
        children: [{
            data: "d50",
            children: []
        }, {
            data: "d60",
            children: []
        }]
    }, {
        data: "d30",
        children: []
    }, {
        data: "d40",
        children: [{
            data: "d80",
            children: []
        }]
    }]
}

function displayGtree(node) {
    // self work 
    let mnMyfam = node.data + "=>";
    // console.log(mnMyfam);
    // children array length => 0
    for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        mnMyfam += child.data + ",";
    }
    console.log(mnMyfam)
    // faith=> abstraction
    //  recursive call 
    for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        displayGtree(child);
    }
}

displayGtree(root);






