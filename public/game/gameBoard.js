export class GameBoard {
  constructor(
    computer,
    gameWon = 0,
    matrix = ["", "", "", "", "", "", "", "", ""],
    counter = 1
  ) {
    this.gameWon = gameWon;
    this.matrix = matrix;
    this.counter = counter;
    this.computer = computer;
    this.wait = (seconds) =>
      new Promise((res) => setTimeout(res, seconds * 1000));

    this.computerPlayer = this.currentPlayer(
      Math.floor(Math.random() * (3 - 1) + 1)
    );

    this.you = "O";
  }

  loadBoard() {
    let gameChildren = document.querySelectorAll("#game > div");
    this.computer();
    gameChildren.forEach((gameDiv) => {
      gameDiv.addEventListener("click", (e) => {
        if (this.you === "X" && this.counter % 2 !== 0) {
          this.action(gameDiv);
        } else if (this.you === "O" && this.counter % 2 === 0) {
          this.action(gameDiv);
        }
        this.wait(0.3).then(this.computer);
      });
    });
  }

  gameState(matrix) {
    if (matrix.indexOf("") < 0) this.winner("none");

    let col1 = matrix[0] + matrix[3] + matrix[6];
    let col2 = matrix[1] + matrix[4] + matrix[7];
    let col3 = matrix[2] + matrix[5] + matrix[8];

    let row1 = matrix[0] + matrix[1] + matrix[2];
    let row2 = matrix[3] + matrix[4] + matrix[5];
    let row3 = matrix[6] + matrix[7] + matrix[8];

    let diagLeft = matrix[0] + matrix[4] + matrix[8];
    let diagRight = matrix[2] + matrix[4] + matrix[6];

    let data = [row1, row2, row3, col1, col2, col3, diagLeft, diagRight];

    if (data.indexOf("xxx") >= 0) return this.winner("x");
    if (data.indexOf("ooo") >= 0) return this.winner("o");
  }

  action(gameDiv) {
    let giveUpButton = document.getElementById("give-up");
    let imgX =
      "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
    let imgY =
      "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";

    if (!gameDiv.innerHTML && this.gameWon === 0) {
      if (this.currentPlayer(this.counter) === "x") {
        this.matrix[parseInt(gameDiv.id)] = "x";
        gameDiv.className = "played";
        gameDiv.innerHTML = `<img src=${imgX}>`;
      } else {
        this.matrix[parseInt(gameDiv.id)] = "o";
        gameDiv.className = "played";
        gameDiv.innerHTML = `<img src=${imgY}>`;
      }

      this.counter++;
      this.gameState(this.matrix);
      if (this.gameWon === 1) giveUpButton.disabled = true;
    }
  }
  setPlayers() {
    let player = document.getElementById("you");
    let computerP = document.getElementById("computer");

    player.innerText = `You: ${this.you}`;
    computerP.innerText = `computer: ${"working"}`;
  }

  resetGame() {
    let giveUpButton = document.getElementById("give-up");
    let winText = document.querySelector("h1");
    let gameSections = document.querySelectorAll("#game > div");
    let newGameButton = document.getElementById("new-game");

    giveUpButton.disabled = false;
    newGameButton.disabled = true;
    this.gameWon = 0;
    winText.innerText = "";
    this.matrix = ["", "", "", "", "", "", "", "", ""];

    gameSections.forEach((gameSection) => {
      gameSection.innerHTML = "";
      gameSection.classList.remove("played");
    });
    this.counter = 1;

    // computerPlayer = currentPlayer(Math.floor(Math.random() * (3 - 1) + 1));
    // you = computerPlayer === "x" ? "O" : "X";
    // computer(computerPlayer);

    setPlayers();
  }

  currentPlayer(num) {
    if (num % 2 === 0) return "o";
    return "x";
  }

  winner(str) {
    let newGameButton = document.getElementById("new-game");

    let winner = document.querySelector("h1");

    winner.innerText = `Winner: ${str.toUpperCase()}`;
    newGameButton.disabled = false;
    this.gameWon = 1;
  }
}
