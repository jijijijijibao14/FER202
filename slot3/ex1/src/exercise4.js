const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
const [first, , third = 0, ...restAges] = ages;
console.log(first);      // 33
console.log(third);      // 20
console.log(restAges);   // [16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32]

// const total = restAges.reduce((acc, age ) => acc + age, 0);
// console.log(total);

// let EvenNumber = (...x) => restAges
// .filter(x => x%2 ===0 ).reduce((acc, anh) => acc-anh, 0);
// console.log(EvenNumber());

const sumRest = (...num) => num.filter(n => n %2 ===0).reduce((acc, n) => acc + n, 0);
// console.log(sumRest(restAges));
// const sumRest2 = restAges.reduce((acc, num) => acc + num, 0);

console.log(sumRest(restAges));

