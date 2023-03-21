let age: any = 25;

age = true;
console.log(age);

age = 'hello-governer';
console.log(age);

age = {name: 'luigi'};
console.log(age);

let mixed: any[] = [];

mixed.push(5);
mixed.push('mandy');
mixed.push(false);
mixed.push(true, 'term', 4, );
console.log(mixed);

let hero: {name: any, age: any};

hero = {
    name: "phantom-stranger",
    age: "immortal",
}
console.log(hero)