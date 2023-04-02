const connectFourEl = document.getElementById("connectFour");

const rowCount = 6;
const colCount = 7;
const circleGridEl = [];
const [RED, YELLOW] = ["red", "yellow"];

let circleGrid;
let hoveredCircle;
let isRedTurn;
let isGameOver;

initiliazeGame();

function startGame() {
  clearBoard();
  hoveredCircle = null;
  isRedTurn = true;
  isGameOver = false;
}

function clearBoard() {
  circleGrid = [];
  for (let i = 0; i < colCount; i++) {
    const col = [];
    for (let j = 0; j < rowCount; j++) {
      col.push(null);
      circleGridEl[i][j].className = "circle";
    }
    circleGrid.push(col);
  }
}

function initiliazeGame() {
  for (let i = 0; i < colCount; i++) {
    const columnEl = document.createElement("div");

    columnEl.className = "column";
    columnEl.setAttribute("index", i);
    columnEl.addEventListener("mouseenter", setCircle);
    columnEl.addEventListener("mouseleave", freeCircle);
    columnEl.addEventListener("click", clickColumn);

    for (let j = 0; j < rowCount; j++) {
      const boxEl = document.createElement("div");
      boxEl.className = "box";
      boxEl.innerHTML = `<div class="circle" index="${j}"></div>`;
      columnEl.appendChild(boxEl);
    }

    connectFourEl.appendChild(columnEl);

    circleGridEl.push(Array.from(columnEl.querySelectorAll(".circle")));
  }

  startGame();
}

function clickColumn(e) {
  if (isGameOver || !hoveredCircle) return;
  const x = getIdx(e.currentTarget),
    y = getIdx(hoveredCircle);
  circleGrid[x][y] = isRedTurn ? RED : YELLOW;
  hoveredCircle = null;
  isRedTurn = !isRedTurn;
  setCircle(e);
}

function setCircle(e) {
  const idx = getIdx(e.currentTarget);
  for (let i = rowCount - 1; i >= 0; i--) {
    if (circleGrid[idx][i] === null) {
      hoveredCircle = circleGridEl[idx][i];
      hoveredCircle.classList.add(`bg-${isRedTurn ? RED : YELLOW}`);
      return;
    }
  }
}

function freeCircle() {
  if (hoveredCircle) hoveredCircle.className = "circle";
  hoveredCircle = null;
}

function getIdx(htmlEl) {
  return parseInt(htmlEl.getAttribute("index"));
}
