
/* получаем рандомное значение в диапазоне
function getRand (paramMax, paramMin) {
  return Math.floor(Math.random() * (paramMax - paramMin) + paramMin);
}
*/

/* 1. JSON.stringify - конвертирует JS-объект в string-объект
   2. JSON.parse - конверитрует string-объект в JS-объект
   3. localStorage.setItem('name', value) - вкладываем объект [value], с указанным именем ['name'], в локальное ДБ
   4. localStorage.getItem('name') - получаем значение объекта [value] по указанному имени ['name']
   5. localStorage.removeItem('name') - удаляет объект из локального хранилища
*put - localStorage.setItem('score', JSON.stringify(score));
*get - const score = JSON.parse(localStorage.getItem('score'));
*/

let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};
let result = '';
let computerMove = '';
let playerMove = '';

updateScoreElement();

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}.`;
}
function updateResult() {
  document.querySelector('.js-result').innerHTML = `${result}`;
}
function updateMoves() {
  document.querySelector('.js-moves').innerHTML = 
    `You
      <img src="${playerMove}-emoji.png" class="move-icon">
      <img src="${computerMove}-emoji.png" class="move-icon">
    Computer`;
}

function pickComputerMove() {
  let randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber <= 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(pMove) {
  playerMove = pMove;
  pickComputerMove();
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors'){
      result = 'You win.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  updateResult();
  updateMoves();

}

let isAutoPlaying = false;
let intervalId;
let autoPlayButton = document.querySelector('.js-auto-play-button');

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlayButton.classList.add('auto-play-on');
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayButton.classList.remove('auto-play-on');
  }
}
