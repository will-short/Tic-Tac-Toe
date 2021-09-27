if (localStorage.getItem("main")) getLocalStorage();
loadBoard();
newGame();
giveUp();

function giveUp() {
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
  if (gameWon === 0) newGameButton.disabled = true;
  newGameButton.addEventListener("click", resetGame);
}

function setPlayers() {
  let player = document.getElementById("you");
  let computerP = document.getElementById("computer");

  player.innerText = `You: ${you}`;
  computerP.innerText = `computer: ${computerPlayer.toUpperCase()}`;
}

function loadBoard() {
  you = computerPlayer === "x" ? "O" : "X";
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
  let winner = document.querySelector("h1");

  winner.innerText = `Winner: ${str.toUpperCase()}`;
  newGameButton.disabled = false;
  gameWon = 1;
  setLocalStorage();
}

function action(gameDiv) {
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
  let winText = document.querySelector("h1");
  let gameSections = document.querySelectorAll("#game > div");

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
function ai(gameChildrenArr) {
  let middleDiv = document.getElementById("4");
  if (counter === 1 || (counter === 2 && middleDiv.className !== "played")) {
    return middleDiv;
  }

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

  for (let key in gameData) {
    for (let item in key) {
      let keyCondition = gameData[key][item];
      if (keyCondition === computerPlayer) {
        if (key === "diags") index = 2;
        else if (key === "cols") index = 1;
        else if (key === "rows") index = 0;
        return gameChildrenArr.find(
          (child) => child.dataset.pos[index] === item
        );
      }
    }
  }

  let edges = ["11", "13", "31", "33", "12", "21", "23", "32"];
  for (let edge of edges) {
    let playableEdge = gameChildrenArr.find((child) =>
      child.dataset.pos.startsWith(edge)
    );
    if (playableEdge) return playableEdge;
  }
}

function computer() {
  if (gameWon !== 0) return;
  let gameChildren = document.querySelectorAll("#game > div:not(.played)");
  let gameChildrenArr = Array.from(gameChildren);

  let nextMove = ai(gameChildrenArr);
  console.log(nextMove);

  if (computerPlayer === "x" && counter % 2 !== 0) {
    action(nextMove);
  } else if (computerPlayer === "o" && counter % 2 === 0) {
    action(nextMove);
  }
}
