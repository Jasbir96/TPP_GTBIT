// top to bottom left => to right
// System.out.println
// console.log("Hello All:)");
// Dynamically typed language
// Primitive Types=> number ,String, boolean,null ,undefined,Symbol
// Non primitive=> functions,array,objects 
let varName;
varName = 10;
varName = true;
varName = null;
varName = "sdfmbsnmdfjhd";
console.log(varName);
// JS=> 10 days=> Java 
// syntax similar to Java =>  for ,while, conditionals 
let number = 23;
for (let div = 2; div * div <= number; div++) {
    if (number % div == 0) {
        console.log("Number is not prime");
        return;
    }
}
console.log("Number is prime");