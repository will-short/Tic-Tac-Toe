//game meta data
let gameWon = 0;
let counter = 1;
let computerPlayer = currentPlayer(Math.floor(Math.random() * (3 - 1) + 1));
let you = computerPlayer === "x" ? "O" : "X";

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
function ai(gameChildrenArr) {
  for (let key in gameData) {
    for (let item in key) {
      let keyCondition = gameData[key][item];
      if (keyCondition === computerPlayer + computerPlayer) {
        let index = 0;
        if (key === "cols") index = 1;
        else if (key === "diags") index = 2;
        return gameChildrenArr.find(
          (child) => child.dataset.pos[index] === item
        );
      }
    }
  }
  for (let key in gameData) {
    for (let item in key) {
      let keyCondition = gameData[key][item];
      if (keyCondition === you.toLowerCase() + you.toLowerCase()) {
        let index = 0;
        if (key === "cols") index = 1;
        else if (key === "diags") index = 2;
        return gameChildrenArr.find(
          (child) => child.dataset.pos[index] === item
        );
      }
    }
  }
  let corners = ["11", "13", "31", "33"];
  let playableCorner;
  for (let corner of corners) {
    playableCorner = gameChildrenArr.find((child) =>
      child.dataset.pos.startsWith(corner)
    );
    if (playableCorner) break;
  }
  return playableCorner;
}

function computer() {
  if (gameWon !== 0) return;
  let gameChildren = document.querySelectorAll("#game > div:not(.played)");
  let gameChildrenArr = Array.from(gameChildren);

  let nextMove = ai(gameChildrenArr);
  console.log(nextMove);
  let rand = Math.floor(Math.random() * gameChildren.length);

  let middleDiv = document.getElementById("4");

  if (computerPlayer === "x" && counter % 2 !== 0) {
    if (counter === 1) {
      action(middleDiv);
    } else if (nextMove) {
      action(nextMove);
    } else {
      action(gameChildren[rand]);
    }
  } else if (computerPlayer === "o" && counter % 2 === 0) {
    if (counter === 2 && middleDiv.className !== "played") {
      action(middleDiv);
    } else if (nextMove) {
      action(nextMove);
    } else {
      action(gameChildren[rand]);
    }
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

function gameState(gameDiv) {
  let posData = gameDiv.dataset.pos;
  let elData = gameDiv.dataset.el;
  let gamePlayed = document.querySelectorAll("#game > div.played");

  if (gamePlayed.length === 9) winner("none");

  gameData.diags[posData[2]] += elData;
  gameData.diags[posData[3]] += elData;
  gameData.cols[posData[1]] += elData;
  gameData.rows[posData[0]] += elData;

  let data = [gameData.cols[posData[1]], gameData.rows[posData[0]]];

  if (posData[2] && posData[3]) {
    data.push(gameData.diags[posData[2]]);
    data.push(gameData.diags[posData[3]]);
  } else if (posData[2]) {
    data.push(gameData.diags[posData[2]]);
  }

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
      gameDiv.setAttribute("data-el", "x");
      gameDiv.className = "played";
      gameDiv.innerHTML = `<img src=${imgX}>`;
    } else {
      gameDiv.setAttribute("data-el", "o");
      gameDiv.className = "played";
      gameDiv.innerHTML = `<img src=${imgY}>`;
    }

    counter++;
    gameState(gameDiv);
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

  gameData = {
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

  gameSections.forEach((gameSection) => {
    gameSection.innerHTML = "";
    gameSection.classList.remove("played");
    delete gameSection.dataset.el;
  });

  counter = 1;

  computerPlayer = currentPlayer(Math.floor(Math.random() * (3 - 1) + 1));
  you = computerPlayer === "x" ? "O" : "X";
  computer();
  setPlayers();
  setLocalStorage();
}

function getLocalStorage() {
  let localMain = localStorage.getItem("main");
  let localCounter = localStorage.getItem("counter");
  let localWinState = localStorage.getItem("winState");
  let localComputer = localStorage.getItem("computer");
  let localgameData = localStorage.getItem("gameData");
  gameData = JSON.parse(localgameData);
  computerPlayer = localComputer;
  main.innerHTML = localMain;
  counter = localCounter;
  gameWon = parseInt(localWinState);
}

function setLocalStorage() {
  let main = document.getElementById("main");
  localStorage.setItem("computer", computerPlayer);
  localStorage.setItem("main", main.innerHTML);

  localStorage.setItem("gameData", JSON.stringify(gameData));
  localStorage.setItem("counter", counter);
  localStorage.setItem("winState", gameWon);
}
