let gameWon = 0;
let counter = 1;

function currentPlayer(num) {
  if (num % 2 === 0) return "o";
  return "x";
}
let computerPlayer = currentPlayer(Math.floor(Math.random() * (3 - 1) + 1));
let you = computerPlayer === "x" ? "o" : "x";

let gameData = {
  cols: {
    1: "",
    2: "",
    3: "",
  },
  rows: {
    1: "",
    2: "",
    3: "",
  },
  diags: {
    1: "",
    2: "",
  },
};
const wait = (seconds) => new Promise((res) => setTimeout(res, seconds * 1000));

const imgX =
  "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
const imgY =
  "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";

const giveUpButton = document.getElementById("give-up");
const newGameButton = document.getElementById("new-game");
