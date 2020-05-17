// fn ka intro 
// function statement
function hello(greeter) {
    console.log("Hello from " + greeter);
    // return true;
    return undefined;
}
// let rVal = hello("Steve");
// console.log(rVal);
// ********************************************************************
// ********************************************************************
// ************************functions are first class citizens************
// ***********************functions are variable***********************
// Assign a value to  a variable 
let a = [1, 2, 3, 4, 5];
b = a;
// console.log(b);
//  fn definition address copy 
let greeter = function sayHi() {
    console.log("function expression");
}
// let greeter=10;
// fn address
// console.log(greeter);
// fn execute => returned value 
// console.log(greeter());

// variable can be passed as a parameter
// functions can be passed as a parameter

function myfn(varName) {
    console.log(varName());
    console.log("I am waiting for line 32")
}
// myfn("Hello");
// myfn(true);
// myfn(null);
// myfn(10);
myfn(function sayHi() {
    // let x = 5;
    // x++;
    // console.log(x);
    console.log("function expression");
// console.log("I am code inside sayHi and will only run when sayHi is called");
});

