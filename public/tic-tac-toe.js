// Your code here

window.addEventListener("DOMContentLoaded", (e) => {
  let counter = 0;
  const sections = document.querySelectorAll("#game > div");

  sections.forEach(section => {
      section.addEventListener("click", e => {
          if (!section.innerHTML) {
              counter++;
            if (counter % 2 !== 0) {
                section.innerHTML = "<img src='https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg'>";
                section.className = "x";
            } else {
                section.innerHTML = "<img src='https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg'>";
                section.className = "o";
            }
          }
      })
  })
})
