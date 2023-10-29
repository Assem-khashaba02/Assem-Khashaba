var board = document.querySelector('.board');
var cells = [];
var currentPlayer = 'x';
var moves = 0;
var gameOver = false;

for (var i = 0; i < 9; i++) {
  var cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', cellClick);
  cells.push(cell);
  board.appendChild(cell);
}

var restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', restartGame);

function cellClick() {
  if (gameOver) return;
  if (this.textContent !== '') return;

  this.textContent = currentPlayer;
  this.classList.add(currentPlayer);
  moves++;

  if (checkWin(currentPlayer)) {
    endGame(currentPlayer);
  } else if (moves === 9) {
    endGame('tie');
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  }
}

function checkWin(player) {
  var winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // الأفقي
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // الرأسي
    [0, 4, 8], [2, 4, 6] // القطري
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function endGame(winner) {
  gameOver = true;

  if (winner === 'tie') {
    showMessage('تعادل!');
  } else {
    showMessage('اللاعب ' + winner.toUpperCase() + ' هو الفائز!');
  }

  cells.forEach(cell => {
    if (cell.textContent === winner) {
      cell.classList.add('winner');
    }
  });

  restartButton.style.display = 'block';
}

function showMessage(text) {
  var messageElement = document.querySelector('.message');
  messageElement.textContent = text;
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winner');
  });

  currentPlayer = 'x';
  moves = 0;
  gameOver = false;
  restartButton.style.display = 'none';
  showMessage('');
}