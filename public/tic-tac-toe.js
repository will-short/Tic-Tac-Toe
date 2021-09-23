// Your code here
let gameWon = 0;
let matrix = ["", "", "", "", "", "", "", "", ""];
let counter = 1;

window.addEventListener("DOMContentLoaded", (e) => {
  let gameBoard = document.getElementById("game");
  let localMain = localStorage.getItem("main");
  let localCounter = localStorage.getItem("counter");
  let localMatrix = localStorage.getItem("matrix");
  let localWinState = localStorage.getItem("winState");

  if (localMain) {
    console.log("works");
    main.innerHTML = localMain;
    counter = localCounter;
    matrix = localMatrix.split(",");
    gameWon = parseInt(localWinState);
  } else {
    for (let i = 0; i < 9; i++) {
      let gameDiv = document.createElement("div");
      gameDiv.id = i;
      gameBoard.appendChild(gameDiv);
    }
  }
  loadBoard(gameBoard);
  setLocalStorage();
  newGame(gameBoard);
  giveUp();
});

function setLocalStorage() {
  let main = document.getElementById("main");
  localStorage.setItem("main", main.innerHTML);
  localStorage.setItem("counter", counter);
  localStorage.setItem("matrix", matrix);
  localStorage.setItem("winState", gameWon);
}

function giveUp() {
  let giveUpButton = document.getElementById("give-up");

  giveUpButton.addEventListener("click", (e) => {
    if (currentPlayer() === "x") {
      winnerText("o");
    } else {
      winnerText("x");
    }
    giveUpButton.disabled = true;
  });
}

function newGame(gameBoard) {
  let giveUpButton = document.getElementById("give-up");
  let newGameButton = document.getElementById("new-game");
  let winText = document.querySelector("h1");
  let gameSections = document.querySelectorAll("#game > div");

  if (gameWon === 0) newGameButton.disabled = true;

  newGameButton.addEventListener("click", (e) => {
    giveUpButton.disabled = false;
    newGameButton.disabled = true;
    gameWon = 0;
    winText.innerText = "";
    matrix = ["", "", "", "", "", "", "", "", ""];
    gameSections.forEach((gameSection) => (gameSection.innerHTML = ""));
    counter = 1;
    setLocalStorage();
  });
}

function currentPlayer() {
  if (counter % 2 === 0) return "o";
  return "x";
}

function loadBoard(gameBoard) {
  let imgX =
    "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
  let imgY =
    "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";

  let gameChildren = document.querySelectorAll("#game > div");

  gameChildren.forEach((gameDiv) => {
    gameDiv.addEventListener("click", (e) => {
      if (!gameDiv.innerHTML && gameWon === 0) {
        if (currentPlayer() === "x") {
          matrix[parseInt(gameDiv.id)] = "x";
          gameDiv.innerHTML = `<img src=${imgX}>`;
        } else {
          matrix[parseInt(gameDiv.id)] = "o";
          gameDiv.innerHTML = `<img src=${imgY}>`;
        }
        counter++;
        setLocalStorage();
        gameState(matrix);
      }
    });
  });
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
  let newGameButton = document.getElementById("new-game");

  let winner = document.querySelector("h1");

  winner.innerText = `Winner: ${str.toUpperCase()}`;
  newGameButton.disabled = false;
  gameWon = 1;
  setLocalStorage();
}
