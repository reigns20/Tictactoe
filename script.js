const cells = document.querySelectorAll(".cell");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let scores = { X: 0, O: 0 };
let gameActive = true;

const images = {
    X: ["images/x1.png", "images/x2.png", "images/x3.png"],
    O: ["images/o1.png", "images/o2.png", "images/o3.png"]
};

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function getRandomImage(player) {
    const randomIndex = Math.floor(Math.random() * images[player].length);
    return images[player][randomIndex];
}

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            alert(`${currentPlayer} Wins!`);
            scores[currentPlayer]++;
            updateScoreboard();
            resetBoard();
            return;
        }
    }
    if (!board.includes("")) {
        alert("It's a Draw!");
        resetBoard();
    }
}

function updateScoreboard() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.innerHTML = "");
    gameActive = true;
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!board[index] && gameActive) {
            board[index] = currentPlayer;
            const img = document.createElement("img");
            img.src = getRandomImage(currentPlayer);
            cell.appendChild(img);
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});

resetButton.addEventListener("click", () => {
    resetBoard();
    scores = { X: 0, O: 0 };
    updateScoreboard();
});