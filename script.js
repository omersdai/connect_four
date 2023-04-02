const connectFourEl = document.getElementById("connectFour");

const rowCount = 6;
const colCount = 7;

initiliazeGame();

function initiliazeGame() {
  for (let i = 0; i < colCount; i++) {
    const columnEl = document.createElement("div");
    columnEl.className = "column";
    for (let j = 0; j < rowCount; j++) {
      const boxEl = document.createElement("div");
      boxEl.className = "box";
      boxEl.innerHTML = '<div class="circle"></div>';
      columnEl.appendChild(boxEl);
    }
    connectFourEl.appendChild(columnEl);
  }
}
