//game meta data
let gameWon = 0;
let matrix = ["", "", "", "", "", "", "", "", ""];
let counter = 1;
let computerPlayer = currentPlayer(Math.floor(Math.random() * (3 - 1) + 1));
let you = computerPlayer === "x" ? "O" : "X";
//make docucalls

window.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("main")) getLocalStorage();
  loadBoard();
  newGame();
  giveUp();
});

function giveUp() {
  let giveUpButton = document.getElementById("give-up");
  if (gameWon === 1) giveUpButton.disabled = true;

  giveUpButton.addEventListener("click", (e) => {
    if (currentPlayer(counter) === "x") {
      winner("o");
    } else {
      winner("x");
    }
    giveUpButton.disabled = true;
  });
}

function newGame() {
  let newGameButton = document.getElementById("new-game");
  if (gameWon === 0) newGameButton.disabled = true;
  newGameButton.addEventListener("click", resetGame);
}

function computer() {
  if (gameWon !== 0) return;
  let gameChildren = document.querySelectorAll("#game > div:not(.played)");
  let randDiv = Math.floor(Math.random() * gameChildren.length);

  if (computerPlayer === "x" && counter % 2 !== 0) {
    action(gameChildren[randDiv]);
  } else if (computerPlayer === "o" && counter % 2 === 0) {
    action(gameChildren[randDiv]);
  }
}

function setPlayers() {
  let player = document.getElementById("you");
  let computerP = document.getElementById("computer");

  player.innerText = `You: ${you}`;
  computerP.innerText = `computer: ${computerPlayer.toUpperCase()}`;
}

function loadBoard() {
  you = computerPlayer === "x" ? "O" : "X";
  let wait = (seconds) => new Promise((res) => setTimeout(res, seconds * 1000));

  setPlayers();

  let gameChildren = document.querySelectorAll("#game > div");
  computer();
  gameChildren.forEach((gameDiv) => {
    gameDiv.addEventListener("click", (e) => {
      if (you === "X" && counter % 2 !== 0) {
        action(gameDiv);
      } else if (you === "O" && counter % 2 === 0) {
        action(gameDiv);
      }
      wait(0.3).then(computer);
    });
  });
}

function gameState() {
  if (matrix.indexOf("") < 0) winner("none");

  let col1 = matrix[0] + matrix[3] + matrix[6];
  let col2 = matrix[1] + matrix[4] + matrix[7];
  let col3 = matrix[2] + matrix[5] + matrix[8];

  let row1 = matrix[0] + matrix[1] + matrix[2];
  let row2 = matrix[3] + matrix[4] + matrix[5];
  let row3 = matrix[6] + matrix[7] + matrix[8];

  let diagLeft = matrix[0] + matrix[4] + matrix[8];
  let diagRight = matrix[2] + matrix[4] + matrix[6];

  let data = [row1, row2, row3, col1, col2, col3, diagLeft, diagRight];

  if (data.indexOf("xxx") >= 0) return winner("x");
  if (data.indexOf("ooo") >= 0) return winner("o");
  setLocalStorage();
}

function winner(str) {
  let newGameButton = document.getElementById("new-game");

  let winner = document.querySelector("h1");

  winner.innerText = `Winner: ${str.toUpperCase()}`;
  newGameButton.disabled = false;
  gameWon = 1;
  setLocalStorage();
}

function currentPlayer(num) {
  if (num % 2 === 0) return "o";
  return "x";
}

function action(gameDiv) {
  let giveUpButton = document.getElementById("give-up");
  let imgX =
    "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
  let imgY =
    "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";

  if (!gameDiv.innerHTML && gameWon === 0) {
    if (currentPlayer(counter) === "x") {
      matrix[parseInt(gameDiv.id)] = "x";
      gameDiv.className = "played";
      gameDiv.innerHTML = `<img src=${imgX}>`;
    } else {
      matrix[parseInt(gameDiv.id)] = "o";
      gameDiv.className = "played";
      gameDiv.innerHTML = `<img src=${imgY}>`;
    }

    counter++;
    gameState();
    if (gameWon === 1) giveUpButton.disabled = true;
  }
}

function resetGame() {
  let giveUpButton = document.getElementById("give-up");
  let winText = document.querySelector("h1");
  let gameSections = document.querySelectorAll("#game > div");
  let newGameButton = document.getElementById("new-game");

  giveUpButton.disabled = false;
  newGameButton.disabled = true;
  gameWon = 0;
  winText.innerText = "";
  matrix = ["", "", "", "", "", "", "", "", ""];

  gameSections.forEach((gameSection) => {
    gameSection.innerHTML = "";
    gameSection.classList.remove("played");
  });
  counter = 1;

  computerPlayer = currentPlayer(Math.floor(Math.random() * (3 - 1) + 1));
  you = computerPlayer === "x" ? "O" : "X";
  computer(computerPlayer);

  setPlayers();
  setLocalStorage();
}

function getLocalStorage() {
  let localMain = localStorage.getItem("main");
  let localCounter = localStorage.getItem("counter");
  let localMatrix = localStorage.getItem("matrix");
  let localWinState = localStorage.getItem("winState");
  let localComputer = localStorage.getItem("computer");

  computerPlayer = localComputer;
  main.innerHTML = localMain;
  counter = localCounter;
  matrix = localMatrix.split(",");
  gameWon = parseInt(localWinState);
}

function setLocalStorage() {
  let main = document.getElementById("main");
  localStorage.setItem("computer", computerPlayer);
  localStorage.setItem("main", main.innerHTML);
  localStorage.setItem("counter", counter);
  localStorage.setItem("matrix", matrix);
  localStorage.setItem("winState", gameWon);
}
