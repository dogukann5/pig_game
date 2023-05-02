'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceImage = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

let activePlayer = 0;
let dice;

const roll = () => {
  dice = Math.trunc(Math.random() * 6) + 1;
  diceImage.classList.remove('hidden');
  diceImage.src = `dice-${dice}.png`;
  if (dice === 1) {
    switchPlayer();
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    diceImage.classList.add('hidden');
  } else {
    if (activePlayer === 0) {
      currentScore0.textContent = Number(currentScore0.textContent) + dice;
    } else if (activePlayer === 1) {
      currentScore1.textContent = Number(currentScore1.textContent) + dice;
    }
  }
};

const winner = () => {
  if (Number(score0.textContent) >= 100) {
    player0.classList.add('player--winner');
    player0.classList.remove('player--active');
    rollDice.removeEventListener('click', roll);
    hold.removeEventListener('click', holdNumber);
  } else if (Number(score1.textContent) >= 100) {
    player1.classList.add('player--winner');
    player1.classList.remove('player--active');
    rollDice.removeEventListener('click', roll);
    hold.removeEventListener('click', holdNumber);
  }
};

const switchPlayer = () => {
  if (player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    diceImage.classList.add('hidden');
    dice = 0;
    activePlayer = 1;
  } else if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    diceImage.classList.add('hidden');
    dice = 0;
    activePlayer = 0;
  }
};

const refreshGame = () => {
  diceImage.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  rollDice.addEventListener('click', roll);
  hold.addEventListener('click', holdNumber);
  activePlayer = 0;
};

const holdNumber = () => {
  if (activePlayer === 0) {
    score0.textContent =
      Number(score0.textContent) + Number(currentScore0.textContent);
    currentScore0.textContent = Number(0);
    winner();
    switchPlayer();
  } else if (activePlayer === 1) {
    score1.textContent =
      Number(score1.textContent) + Number(currentScore1.textContent);
    currentScore1.textContent = Number(0);
    winner();
    switchPlayer();
  }
};

rollDice.addEventListener('click', roll);
hold.addEventListener('click', holdNumber);
newGame.addEventListener('click', refreshGame);
