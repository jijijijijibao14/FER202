let lst = [1,2,3,4,5];
lst.forEach(n=>{
    console.log(n*2);
});

let squared = lst.map(n=> n*n);
console.log(squared);

let evenNumber = lst.filter(n=> n%2===0);
console.log("Even number:", evenNumber);

let people = [
    { name: "Bao", age: 21 },
    { name: "Alice", age: 20 },
    { name: "Bob", age: 22 }
];
let totalAge = people.reduce((sum, person) => sum + person.age, 0);
console.log("Total age:", totalAge);    

