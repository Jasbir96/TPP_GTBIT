// // fn ka intro 
// // function statement
// function hello(greeter) {
//     console.log("Hello from " + greeter);
//     return true;
// }
// // let rVal = hello("Steve");
// // console.log(rVal);
// let arr=[1,2,3,4,5];
// console.log(hello); 
// hello=arr;
// console.log(hello);
// // ********************************************************************
// // ********************************************************************
// // ************************functions are first class citizens************
// // ***********************functions are variable***********************
// // Assign a value to  a variable 
// // let a = [1, 2, 3, 4, 5];
// // b = a;
// // // console.log(b);
// // //  fn definition address copy 
// let greeter = function sayHi() {
//     console.log("function expression");
// }
// // // let greeter=10;
// // // fn address
// // // console.log(greeter);
// // // fn execute => returned value 
// // // console.log(greeter());
// // // variable can be passed as a parameter
// // // functions can be passed as a parameter
// // funation that takes a smaller as an input are called hof
// function myfn(varName) {
//     console.log(varName());
//     console.log("I am waiting for line 32")
// }
// // myfn("Hello");
// // myfn(true);
// // myfn(null);
// // myfn(10);
// myfn(function sayHi() {
//     // let x = 5;
//     // x++;
//     // console.log(x);
//     console.log("function expression");
// // console.log("I am code inside sayHi and will only run when sayHi is called");
// });

// you can return a varible from a function 
// you can return a function from a function 
// function helper() {
//     console.log("Helper fn");
//     return function inner() {
//         console.log("Inner fn");
//     };

// }
// let innerfn = helper();
// innerfn();



// function greeter(firstName) {
//     console.log("Hello " + firstName);
//     return function getLastName(lastName) {
//         console.log(`Hello ${firstName} ${lastName}`)
//     }
// }
// let innerFn = greeter("Steve");
// innerFn("Rogers");
function powerCreater(exp) {
    function powerfn(base) {
        return Math.pow(base, exp);
    }
    return powerfn;
}
// let sqaurer = powerCreater(5);
// let ans = sqaurer(5);
// console.log(ans);

powerCreater(powerCreater(5)(3))(2)