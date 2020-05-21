// Array.prototype.myprop = "some value";
// library => code top include 
// Array is class and all array are it's children
// if you need to add some functionality to all the childrens
Array.prototype.sum = function () {
    // this => refer to currently called array 
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
}
let arr = [4, 14, 17, 23, 48, 66];
let arr1 = [4, 67, 17, 23, 48, 66];
let arr2 = [4, 14, -23, 23, 48, 66];
let arr3 = [4, 14, 17, 64, 48, 66];
// console.log(arr.myprop);
// let sum = arr.sum();
console.log(arr.sum());
console.log(arr1.sum());
console.log(arr2.sum());
console.log(arr3.sum());

// arr.mymap(transformer);
// arr.myfilter(test)
// arr.map(transformer);