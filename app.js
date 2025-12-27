let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn"); // Renamed for clarity
let newGameBtn = document.querySelector("#newGameBtn"); // New button for starting a new game
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let currentPlayer = 'O'; // Start with 'O' as the first player
let gameEnded = false; // To track if the game has ended (win or draw)
let moveCount = 0; // To track the number of moves for draw detection

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to reset the game to its initial state
const resetGame = () => {
    currentPlayer = 'O';
    gameEnded = false;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    newGameBtn.classList.add("hide"); // Hide new game button on reset
    resetBtn.classList.remove("hide"); // Show reset button
};

// Event listeners for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameEnded || box.disabled) { // Prevent moves if game ended or box is disabled
            return;
        }
        box.innerText = currentPlayer;
        box.disabled = true;
        moveCount++;

        checkWinner();
        if (!gameEnded) { // Only switch player if game hasn't ended
            currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
        }
    });
});

// Disables all game boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
    resetBtn.classList.add("hide"); // Hide reset button when game ends
    newGameBtn.classList.remove("hide"); // Show new game button
};

// Enables all game boxes and clears their text
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Displays the winner message
const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameEnded = true;
    disableBoxes();
};

// Displays a draw message
const showDraw = () => {
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove("hide");
    gameEnded = true;
    disableBoxes();
};

// Checks for a winner or a draw
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return; // Exit if a winner is found
        }
    }

    // Check for draw if no winner and all boxes are filled
    if (moveCount === 9 && !gameEnded) {
        showDraw();
    }
};

// Event listeners for reset and new game buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);