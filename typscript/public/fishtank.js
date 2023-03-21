"use strict";
//////// TS  explicit types///////
let character;
let age;
let isLoggIn;
// age = "luigi"  //code won't work because age has already been set to number
age = 30;
// isLoggIn = 25; //code won't work because isLoggIn has already been set to boolean
isLoggIn = true;
//////// TS arrays /////////
let ninjas; //array is not empty  
let nmaes = []; //empty array
// ninjas = [10, 23] //code won't work because array has already been set to string
ninjas = ['white-ninja, black-ninja'];
/////// TS union Types /////////
let mixed = [];
mixed.push('hello');
mixed.push(30);
// mixed.push(true)
console.log(mixed);
////////TS Objects ///////
let samuraiOne;
samuraiOne = {
    name: "jaun",
    age: 29
};
samuraiOne = ["game", 45]; // it worked because array is seen as an object 
let samurai;
samurai = { name: 'mario', age: 30, swordType: 'ketana' }; // works only when all fileds are filled
