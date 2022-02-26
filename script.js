'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

let inputLoginUsername = document.querySelector('.login__input--user');
let inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////CREATING USERNAME
const createUsernames = function (accounts) {
  for (const account of accounts) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(value => value.slice(0, 1))
      .join('');
  }
};
createUsernames(accounts);

/////////////DISPLAYING MOVEMENTS
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const mov = sort ? movements.slice(0).sort((a, b) => a - b) : movements;

  for (let [key, value] of mov.entries()) {
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
       <div class="movements__type movements__type--${type}">${
      key + 1
    } ${type}</div>
       <div class="movements__value">${value}€</div>
     </div>`;

    //add html in our code
    containerMovements.insertAdjacentHTML('afterbegin', html);
  }
};

////////////CHANGING INNER BALANCE
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (accumilator, curr) => (accumilator += curr),
    0
  );
  labelBalance.textContent = `${account.balance}€`;
};

//////////BOTTOM SUMMARY
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((accum, curr) => (accum += curr), 0);

  const expenditure = account.movements
    .filter(mov => mov < 0)
    .reduce((accum, curr) => (accum += curr), 0);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((accum, curr) => (accum += curr), 0);

  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${Math.abs(expenditure)}€`;
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

//////////////////UPDATING COMPLETE UI
const updateUI = function (account) {
  //display movements
  displayMovements(account.movements);

  //display balance
  calcDisplayBalance(account);

  //display summary
  calcDisplaySummary(account);
};

//////////////////LOGIN BUTTON
let currentAccount;
btnLogin.addEventListener('click', e => {
  //prevent from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    account =>
      account.username === inputLoginUsername.value &&
      account.pin === Number(inputLoginPin.value)
  );

  if (currentAccount) {
    //display UI and welcome msg
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    updateUI(currentAccount);
  }
});

/////////////////TRANSFER BUTTON
btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const account = accounts.find(
    account => account.username === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    currentAccount.username !== account.username &&
    account
  ) {
    //transfer
    account.movements.push(amount);
    currentAccount.movements.push(-amount);
    // alert(`Transfer done to ${account.owner}`);

    //updating UI
    updateUI(currentAccount);
  }

  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);

  if (loan > 0 && currentAccount.movements.some(mov => mov >= 0.1 * loan)) {
    currentAccount.movements.push(loan);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//CLOSE ACCOUNT BUTTON
btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(account => account.username);
    //  console.log(index);
    inputCloseUsername.value = inputClosePin.value = '';
    //delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }
});

let sortedState = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  sortedState = !sortedState;
  displayMovements(currentAccount.movements, sortedState);
});

const overallBalance = accounts
  .map(account => account.movements)
  .flat()
  .reduce((accum, curr) => (accum += curr), 0);
// console.log(overallBalance);


