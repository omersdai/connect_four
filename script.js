const connectFourEl = document.getElementById("connectFour");

const rowCount = 6;
const colCount = 7;
const connectGoal = 4;
const circleGridEl = [];
const [RED, YELLOW, ORANGE] = ["red", "yellow", "bg-orange"];

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

function isWon(x, y) {
  return (
    isWonHorizontal(x, y) ||
    isWonVertical(x, y) ||
    isWonDiagonal(x, y) ||
    isWonReverseDiagonal(x, y)
  );
}

function isWonHorizontal(x, y) {
  const color = circleGrid[x][y];
  let i = 0,
    count = 0;
  while (0 <= x + i && color === circleGrid[x + i][y]) {
    count++;
    i--;
  }
  i = 1;
  while (x + i < colCount && color === circleGrid[x + i][y]) {
    count++;
    i++;
  }

  return count >= connectGoal;
}

function isWonVertical(x, y) {
  const color = circleGrid[x][y];
  let i = 0,
    count = 0;
  while (0 <= y + i && color === circleGrid[x][y + i]) {
    count++;
    i--;
  }
  i = 1;
  while (y + i < rowCount && color === circleGrid[x][y + i]) {
    count++;
    i++;
  }

  return count >= connectGoal;
}

function isWonDiagonal(x, y) {
  const color = circleGrid[x][y];
  let i = 0,
    count = 0;
  while (0 <= x + i && 0 <= y + i && color === circleGrid[x + i][y + i]) {
    count++;
    i--;
  }
  i = 1;
  while (
    x + i < colCount &&
    y + i < rowCount &&
    color === circleGrid[x + i][y + i]
  ) {
    count++;
    i++;
  }

  return count >= connectGoal;
}

function isWonReverseDiagonal(x, y) {
  const color = circleGrid[x][y];
  let i = 0,
    count = 0;
  while (0 <= x + i && y + i < rowCount && color === circleGrid[x + i][y - i]) {
    count++;
    i--;
  }
  i = 1;
  while (x + i < colCount && 0 <= y + i && color === circleGrid[x + i][y - i]) {
    count++;
    i++;
  }

  return count >= connectGoal;
}

function clickColumn(e) {
  if (isGameOver || !hoveredCircle) return;

  const x = getIdx(e.currentTarget),
    y = getIdx(hoveredCircle);

  circleGrid[x][y] = isRedTurn ? RED : YELLOW;
  hoveredCircle = null;

  if (isWon(x, y)) isGameOver = true;
  isRedTurn = !isRedTurn;
  onMouseEnter(e);
}

function onMouseEnter(e) {
  if (isGameOver) return;
  e.currentTarget.classList.add(ORANGE);
  const idx = getIdx(e.currentTarget);
  for (let i = rowCount - 1; i >= 0; i--) {
    if (circleGrid[idx][i] === null) {
      hoveredCircle = circleGridEl[idx][i];
      hoveredCircle.classList.add(`bg-${isRedTurn ? RED : YELLOW}`);
      return;
    }
  }
}

function onMouseLeave(e) {
  if (hoveredCircle) hoveredCircle.className = "circle";
  e.currentTarget.classList.remove(ORANGE);
  hoveredCircle = null;
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
    columnEl.addEventListener("mouseenter", onMouseEnter);
    columnEl.addEventListener("mouseleave", onMouseLeave);
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

function getIdx(htmlEl) {
  return parseInt(htmlEl.getAttribute("index"));
}
