const person = {
  name: 'Max',
  age: 29,
  greet() {
    console.log(`Hi, I am ${this.name}`);
  }
};

// const printName = (personData) => {
//   console.log(personData.name);
// }

const printName = ({name}) => {
  console.log(name);
}

printName(person);

const {name, age} = person;
console.log(name, age);

const hobbies = ['Sports', 'Cooking'];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);