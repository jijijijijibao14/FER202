export function Exercise3() {
    const person = {
        name: "Costas",
        address: {
            street: "Lalaland 12"
        }
    };

    const {
        address: {
            street,
            city = "Unknown City"
        }
    } = person;

    return (
        <div>
            <h1>Exercise 3</h1>
            <p>Street: {street}</p>
            <p>City: {city}</p>
        </div>
    );
}