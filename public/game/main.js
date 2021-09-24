import { GameBoard } from "./gameBoard.js";
let gameBoard = new GameBoard(computer);

let computerPlayer = "x";

let you = computerPlayer === "x" ? "O" : "X";
window.addEventListener("DOMContentLoaded", (e) => {
  gameBoard.loadBoard(computer);
  giveUp();
  newGame();
});

function giveUp() {
  let giveUpButton = document.getElementById("give-up");
  if (gameBoard.gameWon === 1) giveUpButton.disabled = true;

  giveUpButton.addEventListener("click", (e) => {
    if (gameBoard.currentPlayer(gameBoard.counter) === "x") {
      gameBoard.winner("o");
    } else {
      gameBoard.winner("x");
    }
    giveUpButton.disabled = true;
  });
}

function newGame() {
  let newGameButton = document.getElementById("new-game");
  if (gameBoard.gameWon === 0) newGameButton.disabled = true;
  newGameButton.addEventListener("click", gameBoard.resetGame);
}

function computer() {
  if (gameBoard.gameWon !== 0) return;
  let gameChildren = document.querySelectorAll("#game > div:not(.played)");
  let randDiv = Math.floor(Math.random() * gameChildren.length);

  if (computerPlayer === "x" && gameBoard.counter % 2 !== 0) {
    gameBoard.action(gameChildren[randDiv]);
  } else if (computerPlayer === "o" && gameBoard.counter % 2 === 0) {
    gameBoard.action(gameChildren[randDiv]);
  }
}
