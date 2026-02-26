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
  const oceanDOM = main.querySelector(".board.ocean");
  const ocean = board.ocean;
  const shipStatuses = ocean.values();
  for (let shipStatus of shipStatuses) {
    for (let coord of shipStatus.keys()) {
      const coordArr = JSON.parse(coord);
      const row = coordArr[0];
      const col = coordArr[1];
      const square = oceanDOM.querySelector(
        `[data-rows="${row + 1}"][data-columns="${col + 1}"]`,
      );
      square.classList.add("shipped");
      if (!shipStatus.get(coord)) {
        square.textContent = "X";
        square.classList.add("attacked");
      }
    }
  }
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
