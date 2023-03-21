"use strict";
const logInDetails = (uid, items) => {
    console.log(`${items} has a uuid of ${uid}`);
};
console.log(logInDetails(4224552, 'phone'));
const greets = (user) => {
    return `${user.name} says hi and ypur uid is ${user.uid}`;
};
greets('berry', 535566);
