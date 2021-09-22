// Your code here

window.addEventListener("DOMContentLoaded", (e) => {
  let counter = 0;
  const sections = document.querySelectorAll("#game > div");

  let matrix = ["", "", "", "", "", "", "", "", ""];

  sections.forEach((section) => {
    section.addEventListener("click", (e) => {
      if (!section.innerHTML) {
        counter++;
        if (counter % 2 !== 0) {
          matrix[parseInt(section.id)] = "x";
          section.innerHTML =
            "<img src='https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg'>";
        } else {
          matrix[parseInt(section.id)] = "o";
          section.innerHTML =
            "<img src='https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg'>";
        }
        gameState();
      }
    });
  });

  function gameState() {
    let winner = document.querySelector("h1");
    //checks rows

    if (matrix.every((el) => el === "x" || el === "o"))
      winner.innerText = "Winner: None";

    for (let i = 0; i < matrix.length - 2; i += 3) {
      if (matrix.slice(i, i + 3).every((el) => el === "x"))
        winner.innerText = "Winner: X";
      if (matrix.slice(i, i + 3).every((el) => el === "o"))
        winner.innerText = "Winner: O";
    }

    let col1 = [matrix[0], matrix[3], matrix[6]];
    let col2 = [matrix[1], matrix[4], matrix[7]];
    let col3 = [matrix[2], matrix[5], matrix[8]];

    let cols = [col1, col2, col3];

    if (cols.some((col) => col.every((el) => el === "x")))
      winner.innerText = "Winner: X";

    if (cols.some((col) => col.every((el) => el === "o")))
      winner.innerText = "Winner: O";

    let diagLeft = [matrix[0], matrix[4], matrix[8]];
    let diagRight = [matrix[2], matrix[4], matrix[6]];

    let diags = [diagLeft, diagRight];

    if (diags.some((diag) => diag.every((el) => el === "x")))
      winner.innerText = "Winner: X";

    if (diags.some((diag) => diag.every((el) => el === "o")))
      winner.innerText = "Winner: O";
  }
});
