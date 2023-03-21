let greet: Function;

greet = ()  => {
    console.log("hello");
  };
  

const add = (a: number, b: number, c?: number | string) => { // the question mark seen on c?: is a tag for optional  
    console.log(a + b);
};

add(5, 10); 

const minus = (a: number, b: number): number => {     
    return a - b
}
                                                        
let result = minus(10, 5)

const plus = (a: number, b: number) => {              // minus and plus are the same thing.
    return a - b
}

let outCome = plus(10, 5)