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
    const square = getOceanSquareFromCoord(coord);
    square.classList.add("occupied");
  }

  const hitSet = board.hitSet;
  for (let hitCoord of hitSet) {
    const hitSquare = getOceanSquareFromCoord(hitCoord);
    hitSquare.classList.add("hit");
    hitSquare.textContent = "†";
  }

  const missed = board.missed;
  for (let missedCoord of missed) {
    const missedSquare = getOceanSquareFromCoord(missedCoord);
    missedSquare.classList.add("missed");
    missedSquare.textContent = "ㆍ";
  }
};

export const updateTarget = (board) => {
  const hitSet = board.hitSet;
  for (let hitCoord of hitSet) {
    const hitSquare = getTargetSquareFromCoord(hitCoord);
    hitSquare.classList.add("hit");
    hitSquare.textContent = "†";
  }

  const missed = board.missed;
  for (let missedCoord of missed) {
    const missedSquare = getTargetSquareFromCoord(missedCoord);
    missedSquare.classList.add("missed");
    missedSquare.textContent = ".";
  }
};

const getOceanSquareFromCoord = (coord) => {
  const coordArr = JSON.parse(coord);
  const row = coordArr[0] + 1;
  const col = coordArr[1] + 1;
  const square = main.querySelector(
    `.ocean [data-rows="${row}"][data-columns="${col}"]`,
  );
  return square;
};

const getTargetSquareFromCoord = (coord) => {
  const coordArr = JSON.parse(coord);
  const row = coordArr[0] + 1;
  const col = coordArr[1] + 1;
  const square = main.querySelector(
    `.target [data-rows="${row}"][data-columns="${col}"]`,
  );
  return square;
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

export const updateConsole = (messageObject) => {
  const console = main.querySelector(".console");

  if (!messageObject) {
    const button = console.querySelector(".button.start");
    console.removeChild(button);
    return;
  }

  if (messageObject.playerMessage || messageObject.computermessage) {
    const playerMessage = document.createElement("div");
    const computerMessage = document.createElement("div");
    playerMessage.textContent = messageObject.playerMessage;
    computerMessage.textContent = messageObject.computerMessage;
    console.replaceChildren(playerMessage, computerMessage);
    return;
  }

  if (messageObject.errorMessage) {
    const errorMessage = document.createElement("div");
    errorMessage.textContent = messageObject.errorMessage;
    console.replaceChildren(errorMessage);
    return;
  }

  if (messageObject.resultMessage) {
    const resultMessage = document.createElement("div");
    resultMessage.textContent = messageObject.resultMessage;
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.classList.add("button", "restart");
    console.replaceChildren(resultMessage, restartButton);
    return;
  }
};

export const clearMain = () => {
  main.innerHTML = "";
};

export const renderFooter = () => {
  footer.textContent = "This is footer";
};
