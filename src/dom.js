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
  const consoleDOM = renderConsole();

  boardContainer.append(oceanDesc, targetDesc, ocean, target, consoleDOM);
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
    const colIndex = colIndices[i];
    colIndex.classList.add("index");
    colIndex.textContent = i;
  }

  const rowIndices = board.querySelectorAll(`[data-columns="0"]`);
  for (let i = 1; i < rowIndices.length; i++) {
    const rowIndex = rowIndices[i];
    rowIndex.classList.add("index");
    rowIndex.textContent = String.fromCharCode(64 + i);
  }

  const cornerIndex = board.querySelector(`[data-rows="0"][data-columns="0"]`);
  cornerIndex.classList.add("index");
};

export const getOceanSquare = () => {
  return main.querySelectorAll(".ocean .square");
};

export const highlightShipCandidate = (
  startSquare,
  length,
  isVertical = true,
) => {
  const row = Number(startSquare.dataset.rows);
  const col = Number(startSquare.dataset.columns);
  if (row !== 0 && col !== 0) {
    if (isVertical) {
      if (row + length - 1 > 10) return;
    } else {
      if (col + length - 1 > 10) return;
    }
    for (let i = 0; i < length; i++) {
      if (isVertical) {
        const square = main.querySelector(
          `.ocean [data-rows="${row + i}"][data-columns="${col}"]`,
        );
        square.classList.add("ship-candidate");
      } else {
        const square = main.querySelector(
          `.ocean [data-rows="${row}"][data-columns="${col + i}"]`,
        );
        square.classList.toggle("ship-candidate");
      }
    }
  }
};

export const deHighlightShipCandidate = () => {
  const marked = main.querySelectorAll(".ship-candidate");
  marked.forEach((square) => {
    square.classList.toggle("ship-candidate");
  });
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
  const consoleDOM = document.createElement("div");
  consoleDOM.classList.add("console");

  const startButton = document.createElement("button");
  startButton.textContent = "Start Game";
  startButton.classList.add("button", "start");

  consoleDOM.append(startButton);

  return consoleDOM;
};

export const updateConsole = (messageObject) => {
  const consoleDOM = main.querySelector(".console");

  if (!messageObject) {
    const button = consoleDOM.querySelector(".button.start");
    consoleDOM.removeChild(button);
    return;
  }

  if (messageObject.shippingMessage) {
    const shippingMessage = document.createElement("div");
    shippingMessage.textContent = messageObject.shippingMessage;
    consoleDOM.replaceChildren(shippingMessage);
    if (messageObject.rotationGuide) {
      const rotationGuide = document.createElement("div");
      rotationGuide.classList.add("rotation-guide");
      rotationGuide.textContent = messageObject.rotationGuide;
      consoleDOM.append(rotationGuide);
    }
  }

  if (messageObject.playerMessage || messageObject.computermessage) {
    const playerMessage = document.createElement("div");
    const computerMessage = document.createElement("div");
    playerMessage.textContent = `Player Call: ${messageObject.playerMessage}`;
    computerMessage.textContent = `Computer Call: ${messageObject.computerMessage}`;
    consoleDOM.replaceChildren(playerMessage, computerMessage);
    return;
  }

  if (messageObject.errorMessage) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error");
    errorMessage.textContent = messageObject.errorMessage;
    consoleDOM.replaceChildren(errorMessage);
    return;
  }

  if (messageObject.resultMessage) {
    const resultMessage = document.createElement("div");
    resultMessage.textContent = messageObject.resultMessage;
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.classList.add("button", "restart");
    consoleDOM.replaceChildren(resultMessage, restartButton);
    return;
  }
};

export const clearMain = () => {
  main.innerHTML = "";
};

export const renderFooter = () => {
  footer.textContent = "This is footer";
};
