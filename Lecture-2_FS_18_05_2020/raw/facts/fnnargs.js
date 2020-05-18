// tool=> use => feature emulate 
function myfn(arg1,arg2) {
    // console.log(arg1+" "+arg2);
    // 
    console.log(arguments);
}
// function overloading  is not possible
myfn();
myfn("Hello");
myfn("Hello", "All");
