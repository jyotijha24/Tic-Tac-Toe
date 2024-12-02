const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-btn');
const messageDiv = document.getElementById('message');
let currentPlayer = 'X'; // Starting player
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Check if there is a winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameActive = false; // Game is over
            messageDiv.textContent = `${gameBoard[a]} Wins!`; // Display the correct winner
            return;
        }
    }

    // Check for draw
    if (!gameBoard.includes('')) {
        isGameActive = false;
        messageDiv.textContent = "It's a Draw!";
    }
}

// Handle cell click
function handleCellClick(index) {
    if (!isGameActive || gameBoard[index]) return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    checkWinner(); // Check if there's a winner after this move

    if (isGameActive) {
        // Switch player after the turn if the game is still active
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Reset game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';  // Start with 'X' after reset
    isGameActive = true;
    messageDiv.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);
