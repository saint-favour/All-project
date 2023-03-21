"use strict";
//TS function
const circ = (diameter) => {
    return diameter * Math.PI;
};
console.log(circ(7.8));
///////// TS array/////////////
let names = ['luigi', 'mario', 'yoshi'];
names.push('princes-bubblegum');
//names.push(3);
//names[0] = 3;
// console.log(names)
let numbers = [10, 20, 40, 60];
// numbers.push('jams');
// numbers[1] = "jimmy";
numbers.push(25);
// console.log(numbers)
let mixed = ["ken", 10, "kenny", false];
mixed.push('kenneth');
mixed.push(10);
mixed[0] = 3;
console.log(mixed);
///////// TS objects//////////////
let samurai = {
    name: "champolo",
    sword: "ketana",
    legendary: true,
    age: 22,
    skills: "sword-play"
};
// console.log(samurai)
