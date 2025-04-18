let colorMode = "black";

const container = document.querySelector("#container");
let isDrawing = false;
let isErasing = false;

container.addEventListener("mousedown", () => {
  isDrawing = true;
});
container.addEventListener("mouseup", () => {
  isDrawing = false;
});
container.addEventListener("mouseleave", () => {
  isDrawing = false;
});

const eraseBtn = document.querySelector("#erase-btn");
const drawBtn = document.querySelector("#draw-btn");

drawBtn.disabled = true;

eraseBtn.addEventListener("click", () => {
  isErasing = true;
  document.body.classList.add("erasing-mode");

  eraseBtn.disabled = true;
  drawBtn.disabled = false;
});

drawBtn.addEventListener("click", () => {
  isErasing = false;
  document.body.classList.remove("erasing-mode");

  drawBtn.disabled = true;
  eraseBtn.disabled = false;
});

function drawOnSquare(square) {
  if (isErasing) {
    square.style.backgroundColor = "white";
    square.style.opacity = 1;
    delete square.dataset.hovered;
  } else {
    if (!square.dataset.hovered) {
      let color;

      if (colorMode === "black") {
        color = "black";
      } else if (colorMode === "rainbow") {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        color = `rgb(${r}, ${g}, ${b})`;
      } else if (colorMode === "custom") {
        color = colorPicker.value;
      }

      square.style.backgroundColor = color;
      square.style.opacity = 0.5; 
      square.dataset.hovered = "true";
    } else {
      let currentOpacity = parseFloat(square.style.opacity);
      if (currentOpacity < 1) {
        square.style.opacity = currentOpacity + 0.1;
      }
    }
  }
}

const blackModeBtn = document.querySelector("#black-mode-btn");
const rainbowModeBtn = document.querySelector("#rainbow-mode-btn");
const colorPicker = document.querySelector("#color-picker");

blackModeBtn.addEventListener("click", () => {
  colorMode = "black";
});

rainbowModeBtn.addEventListener("click", () => {
  colorMode = "rainbow";
});

colorPicker.addEventListener("input", (e) => {
  colorMode = "custom";
});

container.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("grid-square") && isDrawing) {
    drawOnSquare(event.target);
  }
});

function createGrid(gridSize) {
  container.innerHTML = "";

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");

    square.style.width = `${560 / gridSize}px`;
    square.style.height = `${560 / gridSize}px`;

    square.addEventListener("mousedown", () => {
      drawOnSquare(square);
    });

    container.appendChild(square);
  }
}

createGrid(16);

const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
  let input = prompt("Enter number of squares per side (max 100):");
  let size = parseInt(input);

  if (isNaN(size) || size < 1 || size > 100) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  createGrid(size);
});
