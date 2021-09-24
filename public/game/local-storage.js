export function setLocalStorage() {
  let main = document.getElementById("main");
  localStorage.setItem("computer", computerPlayer);
  localStorage.setItem("main", main.innerHTML);
  localStorage.setItem("counter", counter);
  localStorage.setItem("matrix", matrix);
  localStorage.setItem("winState", gameWon);
}
