// require => required => execute
// and module.exports object is exported 
let libFile = require("./lib");
console.log(libFile.myVar);
libFile.happyFunction();
// libFile.secretfn();