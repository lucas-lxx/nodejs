const person = {
  name: 'Max',
  age: 29,
  greet() {
    console.log(`Hi, I am ${this.name}`);
  }
};

person.greet();

const hobbies = ['Sports', 'Cooking'];
// for (let hobby of hobbies) {
//   console.log(hobby)
// }

// const hobbiesMaped = hobbies.map(hobby => `Hobby: |${hobby}|`);
// console.log(`hobbies: ${hobbies}`);
// console.log(`hobbiesMaped: ${hobbiesMaped}`);
// hobbies.push('Programming');
// console.log(hobbies)
const copiedArray = [...hobbies];
console.log(copiedArray);

// const toArray = (arg1, arg2, arg3, arg4) => [arg1, arg2, arg3];
// console.log(toArray(1, 2, 3));
const toArray = (...args) => args;
console.log(toArray(1, 2, 3));
console.log(toArray(1, 2, 3, 4));
console.log(toArray(1, 2, 3, 4, 5));
