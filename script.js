let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let isAgainstComputer = true; // Default to play against the computer
let player1Wins = 0;
let player2Wins = 0;
let player1Losses = 0;
let player2Losses = 0;
let ties = 0;

function handleClick(index) {
  if (!gameOver && gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    renderBoard();
    checkWinner();
    if (!gameOver) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (isAgainstComputer && currentPlayer === 'O') {
        // Computer's turn
        setTimeout(computerTurn, 500); // Delay computer's move for better UX
      }
    }
  }
}

function renderBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = gameBoard[index];
  });

  // Display whose turn it is
  document.getElementById('turn-message').textContent = 
    gameOver ? 'Game Over' : (isAgainstComputer ? `Your turn (${currentPlayer})` : `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`);
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      if (gameBoard[a] === 'X') {
        player1Wins++;
        player2Losses++;
      } else {
        player2Wins++;
        player1Losses++;
      }
      updateScoreboard();
      alert(`${gameBoard[a]} wins!`);
      break;
    }
  }
  if (!gameBoard.includes('') && !gameOver) {
    gameOver = true;
    ties++;
    updateScoreboard();
    alert("It's a tie!");
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  renderBoard();
}

function computerTurn() {
  if (!gameOver) {
    const emptyCells = gameBoard.reduce((acc, cell, index) => {
      if (cell === '') acc.push(index);
      return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const index = emptyCells[randomIndex];
    gameBoard[index] = currentPlayer;
    renderBoard();
    checkWinner();
    if (!gameOver) currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function updateScoreboard() {
  document.getElementById('player1Wins').textContent = player1Wins;
  document.getElementById('player1Losses').textContent = player1Losses;
  document.getElementById('player2Wins').textContent = player2Wins;
  document.getElementById('player2Losses').textContent = player2Losses;
  document.getElementById('ties').textContent = ties;
}