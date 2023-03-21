// example 1
let mortal_combat: (a: string, b: string) => void;

mortal_combat = (name: string, power: string) => {
    console.log(`${name} has ${power}`)
}

// example 2
let cal: (a: number, b: number, c: string) => number;

cal = (num1: number, num2: number, action: string) => {
    if(action === 'add'){
     return num1 + num2
    }else {
      return  num1 - num2
    }
}

// example 3
let logDetails: (obj: {name: string, age: number }) => void;

type person = {name: string, age: number}

logDetails = (samurai: person) => {
    console.log(`${samurai.name} is ${samurai.age} years old `)
}

logDetails = (samurai: {name: string, age: number}) => {
    console.log(`${samurai.name} is ${samurai.age} years old `)
}