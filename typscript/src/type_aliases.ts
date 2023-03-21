type StringOrNum = string | number
type objWithName = {name: string, uid: StringOrNum}

const logInDetails = (uid: StringOrNum, items: string) => {
    console.log(`${items} has a uuid of ${uid}`);
};
console.log(logInDetails(4224552,'phone'))

const greets = (user: objWithName) => {
     console.log(`${user.name} says hi and ypur uid is ${user.uid}`)
}

const greeting = (user: {name: string, uid: StringOrNum}) => {
    console.log(`${user.name} says hi and ypur uid is ${user.uid}`)
}