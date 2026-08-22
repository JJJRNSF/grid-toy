const INVERT_PROBABILITY = 0.5

// Track pointer (mouse/touch) state
let isPointerDown = false;

document.addEventListener('pointerdown', () => isPointerDown = true);
document.addEventListener('pointerup', () => isPointerDown = false);
document.addEventListener('pointercancel', () => isPointerDown = false);
window.addEventListener('blur', () => isPointerDown = false);

function createGrid(rows = 10, cols = 10) {
  const grid = document.getElementById('grid');
  if (!grid) return;

  grid.innerHTML = '';

  const total = rows * cols;
  for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    if (Math.random() < INVERT_PROBABILITY) {
      cell.classList.add('black');
    }

    // Click toggles cell
    cell.addEventListener('click', () => {
      cell.classList.toggle('black');
    });

    // Drag (pointer-enter while pointer is down) toggles cell
    cell.addEventListener('pointerenter', () => {
      if (isPointerDown) {
        cell.classList.toggle('black');
      }
    });

    grid.appendChild(cell);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start');

  // If there's a start button, create the grid on click and then hide the button.
  // Otherwise create it immediately.
  if (startButton) {
    startButton.addEventListener('click', () => {
      createGrid();
      startButton.style.display = 'none';
    });
  } else {
    createGrid();
  }
});
