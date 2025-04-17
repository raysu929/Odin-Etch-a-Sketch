const container = document.querySelector('#container');

const gridSize = 16;

for(let i = 0; i < gridSize * gridSize; i++) {
  const square = document.createElement("div");
  square.classList.add("grid-square");

  square.addEventListener('mouseover', () => {
    square.style.backgroundColor = 'black';
  });

  container.appendChild(square);
}