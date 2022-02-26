
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementUSD = movements.map(mov => Math.round(mov * 1.1));

// console.log(movementUSD);

//first value and second index
const movementDescription = movements.map(
  (value, index) =>
    `Movement ${index + 1}:You ${
      value > 0 ? 'deposited' : 'withdraw'
    } ${Math.abs(value)}`
);

// console.log(movementDescription);

const user = 'Steven Thomas Williams'; //stw
const username = user
  .toLowerCase()
  .split(' ')
  .map(value => value.slice(0, 1))
  .join('');

// console.log(username);

const deposits = movements.filter(mov => mov > 0);
const withdrawal = movements.filter(mov => mov < 0);
// console.log(deposits);
// console.log(withdrawal);

const balance = movements.reduce(
  (accumilator, curr) => (accumilator += curr),
  0
);
//accumilator will start with zero

// console.log(balance);

const eurToUsd = 1.1;

//PIPELINE
const totalDepositInUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((accum, curr) => (accum += curr), 0);

// console.log(totalDepositInUsd);

//this will only return first element unlike filter method
const answer = movements.find(mov => mov < 0);
// console.log(answer);
// console.log(accounts);

const account = accounts.find(account => account.owner === 'Jessica Davis');
// console.log(account);

/////////////////////////////////////////////////
//coding challenge 1

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJulieCorrected = dogsJulia.slice();
  dogsJulieCorrected.splice(0, 1);
  dogsJulieCorrected.splice(-2);
  // dogsJulieCorrected.slice(1,3);

  const dogs = [...dogsJulieCorrected, ...dogsKate];

  for (const [i, value] of dogs.entries()) {
    if (value >= 3) {
      console.log(`Dog number ${i + 1} is an adult and is ${value} years old`);
    } else {
      console.log(`Dog  number ${i + 1} is still a puppy 🐕 `);
    }
  }
};

// checkDogs([3,5,2,12,7],[4,1,15,8,3]);

//////////////////////////////////////////////////
//coding challenge 2

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const calsAverageHumanDogs = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  console.log(humanAges);
  const adults = humanAges.filter(age => age >= 18);
  console.log(adults);
  const average =
    adults.reduce((accum, curr) => (accum += curr), 0) / adults.length;
  console.log(Math.round(average));

  // const average =
  //   ages
  //     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
  //     .filter(age => age >= 18)
  //     .reduce((accum, curr) => (accum += curr), 0) / adults.length;
};

// calsAverageHumanDogs(data1);
// calsAverageHumanDogs(data2);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);
//EQUALLITY
console.log(movements.includes(-130));

//CONDITION
const anyDeposits=movements.some((mov)=>mov>500);
console.log(anyDeposits);

//EVERY METHOD -only return thr true if all the lements passes the condition
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(account4.movements.every((mov)=>mov>0));

//FLAT AND FLATMAP
const arr=[[1,2,3],[5,6,8]];
console.log(arr.flat()); //[1,2,3,5,6,8]

const owner=['Jonas','Zach','Adma','Martha'];
console.log(owner.sort());


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//FOR SORTING NUMBER
//ACENDING
console.log(movements.sort((a,b)=>a-b));
console.log(movements.sort((a,b)=>{
  if(a>b) return 1;
  if(a<b) return -1;
}));

//decnding
console.log(movements.sort((a,b)=>b-a));
console.log(movements.sort((a,b)=>{
  if(a>b) return -1;
  if(a<b) return 1;
}));


console.log(new Array(1,2,3,4,5,6,7));

const x=new Array(7);
console.log(x);

//start and end parameter
x.fill(2,3,5);
console.log(x)




//CODING CHALLENGE

const dogs = [
  { weight: 22, curFood: 250, owner: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owner: ['Matilda'] },
  { weight: 13, curFood: 275, owner: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owner: ['Michael'] },
];

//1
dogs.forEach((dog, i) => {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});

// dogs.forEach((dog,i) =>{
//   console.log(dog);
// })

//2
const dogSarah = dogs.find(dog => dog.owner.includes('Sarah'));
// console.log(dogSarah);

// console.log(
//   `Sarah's dog is eating too ${
//     dogSarah.curFood > dogSarah.recFood ? 'much' : 'less'
//   }`
// );

const ownerEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .map(dog => dog.owner)
  .flat();

//flat to conbine arrays
//map to extract something from objects
// const ownerEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recFood)
//   .map(dog => dog.owner)
//   .flat();

const ownerEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owner);

// console.log(ownerEatTooMuch);
// console.log(ownerEatTooLittle);

//4
const str1=ownerEatTooMuch.join(' and ');
// console.log(`${str1}'s dogs eat too much`)

// console.log(dogs.some((dog) =>dog.curFood==dog.recFood))

const checkEating=(dog)=>dog.curFood>dog.recFood*0.9 && dog.curFood<dog.recFood*1.1

// console.log(dogs.some(checkEating))

// console.log(dogs.filter(checkEating))

//copy of dogs
const dogsSorted=dogs.slice().sort((a,b)=>a.recFood-b.recFood);
console.log(dogsSorted)




