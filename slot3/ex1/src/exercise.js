const double = (x) => x * 2;
console.log(double(5)); // Should print 10
//other way
const double2 = (x) => {return x * 2};
console.log(double2(5)); // Should print 10
//other way
function double3(x) {
    return x * 2;
}
console.log(double3(5)); // Should print 10


const double4 = x => x * 2;
const isEven = x => x % 2 === 0;
console.log(isEven(4)); // Should print true
console.log(isEven(5)); // Should print false

let Odd = x => x % 2 !== 0;
console.log(Odd(4)); // Should print false
console.log(Odd(5)); // Should print true

function double5 (x) {
    return x * 2;
}
console.log(double5(5)); // Should print 10

const isOdd = (x) = !isEven
console.log(isEven(x));


