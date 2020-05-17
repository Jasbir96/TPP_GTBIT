let arr = [4, 14, 17, 23, 48, 66];
function transformer(num) {
    if (num % 2 == 0) {
        return num + 1
    } else {
        return num - 1;
    }
}
function squarer(x) {
    return x * x;
}
function test(number) {
    for (let div = 2; div * div <= number; div++) {
        if (number % div == 0) {
            // console.log("Number is not prime");
            return false;
        }
    }
    return true;
}
Array.prototype.mymap = function (cb) {
    let narr = [];
    for (let i = 0; i < this.length; i++) {
        let rVal = cb(this[i]);
        narr.push(rVal);
    }
    return narr;
}
Array.prototype.myFilter = function (cb) {
    let narr = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i]) == true) {
            narr.push(this[i]);
        }
    }
    return narr;
}
console.log(arr);
console.log("````````````````````````");
let tArr = arr.mymap(transformer);
console.log(tArr);
console.log("````````````````````````");
let pArr = tArr.myFilter(test);
console.log(pArr);
// arr.mymap(transformer);
// arr.map()
// parent => feature => inherit childrens
// Array.prototype.
