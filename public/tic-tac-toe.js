// Your code here
let gameWon = false;
window.addEventListener("DOMContentLoaded", (e) => {
  let gameBoard = document.getElementById("game");
  loadBoard(gameBoard);
  newGame(gameBoard);
});
function newGame(gameBoard) {
  let newGameButton = document.getElementById("new-game");
  let winText = document.querySelector("h1");
  newGameButton.addEventListener("click", (e) => {
    winText.innerText = "";
    loadBoard(gameBoard);
  });
}
function loadBoard(gameBoard) {
  let counter = 0;
  let matrix = ["", "", "", "", "", "", "", "", ""];
  let imgX =
    "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
  let imgY =
    "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";

  for (let i = 0; i < 9; i++) {
    let gameDiv = document.createElement("div");
    gameDiv.id = i;

    gameDiv.addEventListener("click", (e) => {
      if (!gameDiv.innerHTML && gameWon === false) {
        counter++;

        if (counter % 2 !== 0) {
          matrix[parseInt(gameDiv.id)] = "x";
          gameDiv.innerHTML = `<img src=${imgX}>`;
        } else {
          matrix[parseInt(gameDiv.id)] = "o";
          gameDiv.innerHTML = `<img src=${imgY}>`;
        }
        gameState(matrix);
      }
    });

    gameBoard.appendChild(gameDiv);
  }
}

function gameState(matrix) {
  if (matrix.every((el) => el)) return winnerText("none");

  let col1 = matrix[0] + matrix[3] + matrix[6];
  let col2 = matrix[1] + matrix[4] + matrix[7];
  let col3 = matrix[2] + matrix[5] + matrix[8];

  let row1 = matrix[0] + matrix[1] + matrix[2];
  let row2 = matrix[3] + matrix[4] + matrix[5];
  let row3 = matrix[6] + matrix[7] + matrix[8];

  let diagLeft = matrix[0] + matrix[4] + matrix[8];
  let diagRight = matrix[2] + matrix[4] + matrix[6];

  let data = [row1, row2, row3, col1, col2, col3, diagLeft, diagRight];

  if (data.some((str) => str === "xxx")) return winnerText("x");
  if (data.some((str) => str === "ooo")) return winnerText("o");
}

function winnerText(str) {
  let winner = document.querySelector("h1");

  winner.innerText = `Winner: ${str.toUpperCase()}`;

  gameWon = true;
}
