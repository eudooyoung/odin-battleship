import "./style.css";
import {
  header,
  main,
  footer,
  renderHeader,
  renderMain,
  renderFooter,
  updateOcean,
  updateTarget,
  updateConsole,
  clearMain,
  highlightShipCandidate,
  getOceanSquare,
  deHighlightShipCandidate,
} from "./dom.js";
import Player from "./player.js";
import Ship from "./ship.js";

const init = () => {
  const body = document.body;

  renderHeader();
  renderMain();
  renderFooter();

  body.append(header, main, footer);
};

const play = async () => {
  const player = new Player(true);
  const computer = new Player();

  const playerBoard = player.board;
  await placeShipFromDOM(playerBoard);

  const computerBoard = computer.board;
  computerBoard.placeShip([0, 0], 0);
  computerBoard.placeShip([0, 1], 1);
  computerBoard.placeShip([0, 2], 2);
  computerBoard.placeShip([0, 3], 3);
  computerBoard.placeShip([0, 4], 4);

  updateOcean(playerBoard);
  updateTarget(computerBoard);

  while (playerBoard.sunk.size < 5 && computerBoard.sunk.size < 5) {
    try {
      const square = await getAttackSquareFromListener();
      const playerMessage = await playerAttack(computerBoard, square);
      const computerMessage = computerAttack(playerBoard);

      updateOcean(playerBoard);
      updateTarget(computerBoard);
      updateConsole({ playerMessage, computerMessage });
    } catch (e) {
      updateConsole({ errorMessage: e.message });
    }
  }

  if (playerBoard.sunk.size === 5) {
    updateConsole({ resultMessage: "Computer Win!" });
  }

  if (computerBoard.sunk.size === 5) {
    updateConsole({ resultMessage: "Player Win!" });
  }
};

const placeShipFromDOM = async (playerBoard) => {
  let shippingMessage;
  for (let i = 0; i < 5; i++) {
    shippingMessage = `Choose square to ship ${Ship.TYPES[i].name}...`;
    updateConsole({ shippingMessage });

    const oceanSquares = getOceanSquare();
    oceanSquares.forEach((oceanSquare) => {
      oceanSquare.addEventListener("mouseover", function highlightListener(e) {
        if (e.shiftKey) {
          highlightShipCandidate(e.target, Ship.TYPES[i].length, false);
        } else {
          highlightShipCandidate(e.target, Ship.TYPES[i].length);
        }
      });

      oceanSquare.addEventListener("mouseout", function deHighlightListener(e) {
        deHighlightShipCandidate(e.target, Ship.TYPES[i].length, false);
        deHighlightShipCandidate(e.target, Ship.TYPES[i].length);
      });
    });

    while (true) {
      try {
        const square = await getShippingSquareFromListener();
        const row = square.dataset.rows - 1;
        const col = square.dataset.columns - 1;
        playerBoard.placeShip([row, col], i);
        updateOcean(playerBoard);
        break;
      } catch (e) {
        updateConsole({ errorMessage: e.message });
      }
    }

    // oceanSquares.forEach((oceanSquare) => {
    //   oceanSquare.removeEventListener(
    //     "mouseover",
    //     function highlightListener(e) {
    //       highlightShipCandidate(e.target, Ship.TYPES[i].length);
    //     },
    //   );

    //   oceanSquare.removeEventListener(
    //     "mouseout",
    //     function deHighlightListener(e) {
    //       deHighlightShipCandidate(e.target, Ship.TYPES[i].length);
    //     },
    //   );
    // });
  }

  shippingMessage = "Shipping has been completed. Game Start!";
  updateConsole({ shippingMessage });
};

const getShippingSquareFromListener = () => {
  return new Promise((resolve, reject) => {
    main.addEventListener("click", function shippingListener(e) {
      const square = e.target.closest(".ocean .square");
      if (!square) {
        reject(new Error());
      }
      if (e.shiftKey) {
        resolve({ square: square, isVertical: false });
      } else {
        resolve({ square: square, isVertical: true });
      }
      main.removeEventListener("click", shippingListener);
    });
  });
};

const getAttackSquareFromListener = () => {
  return new Promise((resolve, reject) => {
    main.addEventListener("click", function attackListener(e) {
      const square = e.target.closest(".target .square");
      if (!square) {
        reject(new Error());
      }
      resolve(square);
      main.removeEventListener("click", attackListener);
    });
  });
};

const playerAttack = async (board, square) => {
  const row = square.dataset.rows - 1;
  const col = square.dataset.columns - 1;
  const attackResult = board.recieveAttack([row, col]);
  return generateAttackResult(attackResult, row, col);
};

const computerAttack = (board) => {
  let row = Math.floor(Math.random() * 10);
  let col = Math.floor(Math.random() * 10);
  let coord = [row, col];
  let coordStr = JSON.stringify(coord);
  while (board.missed.has(coordStr) || board.hitSet.has(coordStr)) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
    coord = [row, col];
    coordStr = JSON.stringify(coord);
  }

  const attackResult = board.recieveAttack([row, col]);
  return generateAttackResult(attackResult, row, col);
};

const generateAttackResult = (attackResult, row, col) => {
  const rowAsDisplay = String.fromCharCode(row + 65);
  const colAsDisplay = col + 1;
  let resultMessage = `${rowAsDisplay}-${colAsDisplay}... `;
  if (attackResult === null) {
    resultMessage += "Missed.";
    return resultMessage;
  }
  resultMessage += `Hit! ${attackResult}.`;
  return resultMessage;
};

const refreshBoard = () => {
  clearMain();
  renderMain();
};

main.addEventListener("click", (e) => {
  const startButton = e.target.closest(".button.start");
  if (startButton) {
    play();
  }

  const restartButton = e.target.closest(".button.restart");
  if (restartButton) {
    refreshBoard();
    play();
  }
});

init();
