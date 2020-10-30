const cells = [];
const containerSize = 480;
let size = 16;
let isDrawing = false;
let isColorRandomised = false;
let etchColor = "#000";
let hue = 0;

const canvas = document.querySelector(".canvas");
const resetBtn = document.querySelector(".reset-btn");
const setGridBtn = document.querySelector(".set-grid-btn");
const randomiseColorBtn = document.querySelector(".randomise-color-btn");
const etchColorPicker = document.querySelector(".etch-color-picker");

const clearCells = () => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      cells[i][j].style.backgroundColor = "#fff";
      cells[i][j].classList.remove("pixlate");
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
  if (isColorRandomised) {
    setRandomisedColor();
  }
};

const setRandomisedColor = () => {
  isColorRandomised = !isColorRandomised;
  randomiseColorBtn.textContent = isColorRandomised
    ? "Single Color"
    : "Random Colors";
  etchColor = etchColorPicker.value;
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
        square.classList.add("pixlate");
      });

      cells[i].push(square);
      row.appendChild(square);
    }
    container.appendChild(row);
  }
}

function handleHover() {
  if (isColorRandomised) {
    etchColor = `hsl(${hue}, 100%, 50%)`;
    hue = (hue + 10) % 360;
  }

  if (isDrawing) {
    this.style.backgroundColor = etchColor;
    this.classList.add("pixlate");
  }
}

resetBtn.addEventListener("click", clearCells);
setGridBtn.addEventListener("click", setGridSize);
randomiseColorBtn.addEventListener("click", setRandomisedColor);
etchColorPicker.addEventListener("input", setEtchColor);

function main() {
  const container = document.createElement("div");
  container.classList.add("container");
  container.style.width = `${containerSize}px`;
  createGrid(size, container);
  canvas.appendChild(container);
}

main();
