// key :value => valid js type 
// JSON => Javascript object notation
let cap = {
    name: "Steve",
    lastName: "Rogers",
    age: 45,
    friends: ["Peter", "Bruce", "Tony"],
    address: {
        state: "New York",
        region: "Manhatten"
    },
    isAvenger: true
}
// GET 
// console.log(cap.friends);
// console.log(cap.address.state);
// console.log(cap.isAvenger);
// SET => Insert/update 
console.log(cap);
console.log("``````````````````````````````````````");
cap.newKey="I was added later";
cap.isAvenger=false
// Delete 
delete cap.friends
console.log(cap);