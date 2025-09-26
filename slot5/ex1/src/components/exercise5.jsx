export function Exercise5() {
    const people = [
  {name: 'Jack', age: 50},
  {name: 'Michael', age: 9}, 
  {name: 'John', age: 40}, 
  {name: 'Ann', age: 19}, 
  {name: 'Elisabeth', age: 16}
];
const teens = people
        .filter(person => person.age >= 13 && person.age <= 19)
        .map(person => `${person.name} (${person.age})`);

    return (
        <div>
            <h1>Exercise 5</h1>
            {teens.map((str, idx) => (
                <div key={idx}>{str}</div>
            ))}
        </div>
    );
}