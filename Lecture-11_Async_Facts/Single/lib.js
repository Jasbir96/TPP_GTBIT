// data analytics lib
// this is cb based libraray 
module.exports.chargeCreditCard = function (data, cb) {
    console.log(data);
    cb();
    cb();
    cb();
    cb();
    cb();
}
module.exports.chargeCreditCard = function (data) {
    return new Promise(function (resolve, reject) {
        console.log(data);
        resolve();
        resolve();
        resolve();
        resolve();
        resolve();
    })
}