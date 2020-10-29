const cells = [];
const containerSize = 480;
let size = 16;
let isDrawing = false;
let etchColor = "#000";

const canvas = document.querySelector(".canvas");
const resetBtn = document.querySelector(".reset-btn");
const setGridBtn = document.querySelector(".set-grid-btn");
const etchColorPicker = document.querySelector(".etch-color-picker");

const clearCells = () => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      cells[i][j].style.backgroundColor = "#fff";
    }
  }
};

const setGridSize = () => {
  const newSize = parseInt(prompt("Enter grid size", "16"));
  size = newSize || 16;
  if (size > 0 && size <= 100) {
    document.documentElement.style.setProperty(
      "--length",
      `${containerSize / size}px`
    );

    canvas.children[0].remove();
    main();
  } else {
    alert("Grid size can only be 1-100 inclusive");
  }
};

const setEtchColor = (e) => {
  etchColor = e.target.value;
};

function createGrid(size, container) {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    cells[i] = [];
    for (let j = 0; j < size; j++) {
      const square = document.createElement("div");
      square.classList.add("cell");
      square.addEventListener("mouseenter", handleHover);

      square.addEventListener("click", () => {
        isDrawing = !isDrawing;
        square.style.backgroundColor = etchColor;
      });

      cells[i].push(square);
      row.appendChild(square);
    }
    container.appendChild(row);
  }
}

function handleHover() {
  if (isDrawing) {
    this.style.backgroundColor = etchColor;
  }
}

resetBtn.addEventListener("click", clearCells);
setGridBtn.addEventListener("click", setGridSize);
etchColorPicker.addEventListener("change", setEtchColor);

function main() {
  const container = document.createElement("div");
  container.classList.add("container");
  container.style.width = `${containerSize}px`;
  createGrid(size, container);
  canvas.appendChild(container);
}

main();
