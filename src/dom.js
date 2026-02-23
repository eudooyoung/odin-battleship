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
  const buttonContainer = renderButtonContainer();

  boardContainer.append(oceanDesc, targetDesc, ocean, target, buttonContainer);
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
  const occupied = ocean.values();
  occupied.forEach((coords) => {
    coords.forEach((coord) => {
      const coordArr = JSON.parse(coord);
      const row = coordArr[0];
      const col = coordArr[1];
      const square = oceanDOM.querySelector(
        `[data-rows="${row + 1}"][data-columns="${col + 1}"]`,
      );
      square.classList.add("shipped");
    });
  });
};

export const updateTarget = (board) => {
  const targetDOM = main.querySelector(".board.target");
  const ocean = board.ocean;
  const occupied = ocean.values();
  occupied.forEach((coords) => {
    coords.forEach((coord) => {
      const coordArr = JSON.parse(coord);
      const row = coordArr[0];
      const col = coordArr[1];
      const square = targetDOM.querySelector(
        `[data-rows="${row + 1}"][data-columns="${col + 1}"]`,
      );
      square.classList.add("shipped");
    });
  });
};

const renderButtonContainer = () => {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const startButton = document.createElement("button");
  startButton.textContent = "Start Game";
  startButton.classList.add("button", "start");

  buttonContainer.append(startButton);

  return buttonContainer;
};

export const renderFooter = () => {
  footer.textContent = "This is footer";
};
