let add = (a,b) => a + b;
console.log(add(1,2));

let greet = (name, TimeOfDay)=>{
    console.log(`Good ${TimeOfDay}, ${name}`);
};
greet("Alice", "Morning");
greet("Bob", "Evening");


let square = x => x * x;
console.log(square(5));
console.log(square(10));

let sayHello = () => console.log("Hello, World!");
sayHello();

let person = {
    name: "Bao",
    age: 21,
    greet: function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};
person.greet(); 
