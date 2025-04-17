const container = document.querySelector('#container');

function createGrid(gridSize) {
    container.innerHTML = '';

for(let i = 0; i < gridSize * gridSize; i++) {
  const square = document.createElement("div");
  square.classList.add("grid-square");

  square.style.width = `${960 / gridSize}px`;
  square.style.height = `${960 / gridSize}px`;

  square.addEventListener('mouseover', () => {
    square.style.backgroundColor = 'black';
  });

  container.appendChild(square);
}
}

createGrid(16);

const button = document.querySelector('#reset-btn');

button.addEventListener('click', () => {
    let input = prompt("Enter number of squares per side (max 100):");
    let size = parseInt(input);

    if (isNaN(size) || size < 1 || size > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    createGrid(size);
});