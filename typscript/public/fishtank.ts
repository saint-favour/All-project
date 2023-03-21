//////// TS  explicit types///////
let character: string;
let age: number;
let isLoggIn: boolean;

// age = "luigi"  //code won't work because age has already been set to number
age = 30;

// isLoggIn = 25; //code won't work because isLoggIn has already been set to boolean
isLoggIn = true

//////// TS arrays /////////
let ninjas: string[]; //array is not empty  
let nmaes: string[] = []; //empty array

// ninjas = [10, 23] //code won't work because array has already been set to string
ninjas = ['white-ninja, black-ninja']; 

/////// TS union Types /////////
let mixed: (string | number)[] = [];
mixed.push('hello');
mixed.push(30);
// mixed.push(true)
console.log(mixed)


////////TS Objects ///////
let samuraiOne: object
samuraiOne = {
    name: "jaun",
    age: 29
    
}
samuraiOne = ["game", 45] // it worked because array is seen as an object 


let samurai: {
    name: string,
    age: number,
    swordType: string
}

samurai = { name: 'mario', age: 30, swordType: 'ketana'} // works only when all fileds are filled