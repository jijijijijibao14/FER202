const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
};

const{
    address:{
        street,
        city = "Unknown City"
    }
}= person;
console.log(street); // Output: "Lalaland 12"
console.log(city); // Output: "Unknown City"=