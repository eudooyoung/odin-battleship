export const header = document.createElement("header");
export const main = document.createElement("main");
export const footer = document.createElement("footer");

export const renderHeader = () => {
  const banner = document.createElement("h1");
  banner.textContent = "Odin Battleship";

  header.append(banner);
};

export const renderMain = () => {
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("board-container");

  const oceanDesc = renderDesc("ocean");
  const targetDesc = renderDesc("target");
  const ocean = renderBoard("ocean");
  const target = renderBoard("target");
  const console = renderConsole();

  boardContainer.append(oceanDesc, targetDesc, ocean, target, console);
  main.append(boardContainer);
};

const renderDesc = (name) => {
  const desc = document.createElement("div");
  desc.classList.add("description", `${name}`);
  desc.textContent = name;

  return desc;
};

const renderBoard = (name) => {
  const board = document.createElement("div");
  board.classList.add("board", `${name}`);

  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.rows = i;
      square.dataset.columns = j;
      board.append(square);
    }
  }

  renderIndices(board);

  return board;
};

const renderIndices = (board) => {
  const colIndices = board.querySelectorAll(`[data-rows="0"]`);
  for (let i = 1; i < colIndices.length; i++) {
    const colIndice = colIndices[i];
    colIndice.textContent = String.fromCharCode(64 + i);
  }

  const rowIndices = board.querySelectorAll(`[data-columns="0"]`);
  for (let i = 1; i < rowIndices.length; i++) {
    const rowIndice = rowIndices[i];
    rowIndice.textContent = i;
  }
};

export const updateOcean = (board) => {
  const occupied = board.occupied;
  for (let coord of occupied) {
    const square = getSquareFromCoord(coord);
    square.classList.add("occupied");
  }

  const attacked = board.attacked;

  const missed = board.missed;
  for (let missedCoord of missed) {
    const missedSquare = getSquareFromCoord(missedCoord);
    missedSquare.classList.add("missed");
  }
};

const getSquareFromCoord = (coord) => {
  const coordArr = JSON.parse(coord);
  const row = coordArr[0] + 1;
  const col = coordArr[1] + 1;
  const square = main.querySelector(
    `[data-rows="${row}][data-columns="${col}]`,
  );
  return square;
};

export const updateTarget = (board) => {
  const targetDOM = main.querySelector(".board.target");
  const target = board.ocean;
  const shipStatuses = target.values();
  for (let shipStatus of shipStatuses) {
    for (let coord of shipStatus.keys()) {
      const coordArr = JSON.parse(coord);
      const row = coordArr[0];
      const col = coordArr[1];
      const square = targetDOM.querySelector(
        `[data-rows="${row + 1}"][data-columns="${col + 1}"]`,
      );
      if (!shipStatus.get(coord)) {
        square.classList.add("attacked");
      }
    }
  }

  const missed = board.missed;
  for (let missedCoord of missed) {
    const missedArr = JSON.parse(missedCoord);
    const row = missedArr[0] + 1;
    const col = missedArr[1] + 1;
    const square = targetDOM.querySelector(
      `[data-rows="${row}"][data-columns="${col}"]`,
    );
    square.classList.add("missed");
    square.textContent = ".";
  }
};

export const mark = (isValidAttack, square) => {
  if (isValidAttack) {
    square.classList.add("show");
    return;
  }

  if (!isValidAttack) {
    square.textContent = ".";
  }
};

const renderConsole = () => {
  const console = document.createElement("div");
  console.classList.add("console");

  const startButton = document.createElement("button");
  startButton.textContent = "Start Game";
  startButton.classList.add("button", "start");

  console.append(startButton);

  return console;
};

export const updateConsole = (turn) => {
  const console = main.querySelector(".console");

  if (turn.current.isReal) {
    const message = document.createElement("div");
    message.textContent = "Wating for attack...";
    console.replaceChildren(message);
  }
};

export const renderFooter = () => {
  footer.textContent = "This is footer";
};
