const name = 'Max';
let age = 29;
const hasHobbies = true;

const summarizeUser = (userName, userAge, userHasHobby) => {
  return (
    'Name is ' +
    userName +
    ', age is ' +
    userAge +
    ' and the user has hobbies: ' +
    userHasHobby
  );
};

// const add = (a, b) => a + b;
// console.log(add(1, 2));

// const addOne = a => a + 1;
// console.log(addOne(3));

const addRandom = () => 1 + 1;
console.log(addRandom());

console.log(summarizeUser(name, age, hasHobbies));