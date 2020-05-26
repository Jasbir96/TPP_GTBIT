console.log("Before");
async function helper() {
    console.log("I am async helper");
    return  Promise.reject("There was some error")
}
// asyn function 
// return value =>  promise => resolve into that value
// return error => promise=> reject => with the  error
console.log("After");
let helperP = helper();
helperP.then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log("Iniside catch")
    console.log(err);
})