function promiseMaker() {
    return new Promise(function (resolve, reject) {
        console.log("I am promise  maker function");
        resolve(10);
    })
}
promiseMaker().then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log(err);
})