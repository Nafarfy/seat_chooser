const arena = document.querySelector(".arena");

const generateNumbersRange = (from, to) => {
  let range = [];

  for (let i = from; i <= to; i++) {
    range.push(i);
  }

  return range;
};

const getSectorLine = (lineNumber) => {
  const seats = generateNumbersRange(1, 10)
    .map((seat) => {
      return `
      <div 
        class="sector__seat" 
        data-seat-number="${seat}">
      </div>
    `;
    })
    .join("");

  return `
    <div class="sector__line" data-line-number="${lineNumber}">
      ${seats}
    </div>
    `;
};

const getSector = (sectorNumber) => {
  const lines = generateNumbersRange(1, 10).map(getSectorLine).join("");

  return `
  <div class="sector" data-sector-number="${sectorNumber}">
    ${lines}
  </div>
  `;
};

const renderArena = () => {
  const sectors = generateNumbersRange(1, 3).map(getSector).join("");

  arena.innerHTML = sectors;
};

const handleSeatSelect = (e) => {
  const isSeat = e.target.classList.contains("sector__seat");

  if (!isSeat) {
    return;
  }

  const seatNumber = e.target.dataset.seatNumber;
  const lineNumber = e.target.parentElement.dataset.lineNumber;
  const sectorNumber = e.target.parentElement.parentElement.dataset.sectorNumber;

  const board = document.querySelector(".board__selected-seat");
  board.textContent = `S${sectorNumber} -- L${lineNumber} -- S${seatNumber}`;
};

const initHandlers = () => {
  arena.addEventListener("click", handleSeatSelect);
};

document.addEventListener("DOMContentLoaded", () => {
  renderArena();
  initHandlers();
});
