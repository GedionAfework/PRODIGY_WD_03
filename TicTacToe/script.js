const cells = document.querySelectorAll(".cell");
const header = document.getElementById("title");
const xPlayer = document.getElementById("xPlayer");
const oPlayer = document.getElementById("oPlayer");
const restart = document.getElementById("restart");
let player = "X";
let isPause = false;
let isGameStart = false;
const inputCells = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => tapCell(cell, index));
});

function tapCell(cell, index) {
  if (cell.textContent === "" && !isPause) {
    isGameStart = true;
    updateCell(cell, index);
    if (!checkWinner()) {
      changePlayer();
      randomPick();
    }
  }
}
function updateCell(cell, index) {
  cell.textContent = player;
  inputCells[index] = player;
  cell.style.color = player === "X" ? "#1892EA" : "#A737FF";
}
function changePlayer() {
  player = player === "X" ? "O" : "X";
}
function checkWinner() {
  for (const [a, b, c] of winConditions) {
    if (
      inputCells[a] === player &&
      inputCells[b] === player &&
      inputCells[c] === player
    ) {
      declareWinner([a, b, c]);
      return true;
    }
  }
  if (inputCells.every((cell) => cell !== "")) {
    draw();
    return true;
  }
  return false;
}
function declareWinner(winningIndices) {
  header.textContent = `${player} Wins!!!`;
  isPause = true;
  winningIndices.forEach(
    (index) => (cells[index].style.background = "#2A2343")
  );
  restart.style.visibility = "visible";
}
restart.addEventListener("click", () => {
  restart.style.visibility = "hidden";
  inputCells.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.background = "";
  });
  isPause = false;
  isGameStart = false;
  header.textContent = "Choose";
  player = "X";
  xPlayer.classList.remove("player-active");
  oPlayer.classList.remove("player-active");
});
function draw() {
  header.textContent = "Draw!";
  isPause = true;
  restart.style.visibility = "visible";
}
function choosePlayer(selectedPlayer) {
  if (!isGameStart) {
    player = selectedPlayer;
    if (player === "X") {
      xPlayer.classList.add("player-active");
      oPlayer.classList.remove("player-active");
    } else {
      oPlayer.classList.add("player-active");
      xPlayer.classList.remove("player-active");
    }
  }
}
function randomPick() {
  if (!isPause) return;
  setTimeout(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * inputCells.length);
    } while (inputCells[randomIndex] !== "");
    updateCell(cells[randomIndex], randomIndex);
    if (!checkWinner()) {
      changePlayer();
      isPause = false;
    }
  }, 1000);
}
