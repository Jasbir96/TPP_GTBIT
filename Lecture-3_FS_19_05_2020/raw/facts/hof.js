let arr = [4, 14, 17, 23, 48, 66];
//  map=> even =>elem+1
// odd => elem-1
function transformer(num) {
    if (num % 2 == 0) {
        return num + 1
    } else {
        return num - 1;
    }
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
// The map() method creates a new array populated with the results of calling 
// a provided function on every element in the calling array.
let tArr = arr.map(transformer);
// The filter() method creates a
//  new array with all elements that pass
//  the test implemented by the provided function.
let pArr = tArr.filter(test);
console.log(arr);
console.log("`````````````````````````````");
console.log(tArr);
// console.log("````````````````````````````````````");
// console.log(pArr);
// HW
// Freecodecamp=> Basic JavaScript,Functional Programming
// mymap(arr,transformer);
// myfilter(arr,test);
// Relative path=>../../Lecture-1_FS_16_05_2020
// Absoulte => C:\Users\Mafia\Desktop\GTBIT\Lecture-1_FS_16_05_2020