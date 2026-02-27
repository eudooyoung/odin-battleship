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
  mark,
  updateConsole,
} from "./dom.js";
import Player from "./player.js";

const turn = { current: null };

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
  playerBoard.placeShip([0, 0], 0);
  playerBoard.placeShip([0, 1], 1);
  playerBoard.placeShip([0, 2], 2);
  playerBoard.placeShip([0, 3], 3);
  playerBoard.placeShip([0, 4], 4);

  const computerBoard = computer.board;
  computerBoard.placeShip([0, 0], 0);
  computerBoard.placeShip([0, 1], 1);
  computerBoard.placeShip([0, 2], 2);
  computerBoard.placeShip([0, 3], 3);
  computerBoard.placeShip([0, 4], 4);

  turn.current = player;

  updateOcean(playerBoard);
  updateTarget(computerBoard);
  updateConsole(turn);

  while (playerBoard.sunk.size < 5 && computerBoard.sunk.size < 5) {
    try {
      const square = await getSquareFromListener();
      await playerAttack(computerBoard, square);
      computerAttack(playerBoard);

      updateOcean(playerBoard);
      updateTarget(computerBoard);
      updateConsole();
    } catch (e) {
      updateConsole(e);
    }
  }
};

const getSquareFromListener = () => {
  return new Promise((resolve) => {
    main.addEventListener("click", function attackListener(e) {
      const square = e.target.closest(".target .square");
      resolve(square);
      main.removeEventListener("click", attackListener);
    });
  });
};

const playerAttack = async (board, square) => {
  const row = square.dataset.rows - 1;
  const col = square.dataset.columns - 1;
  board.recieveAttack([row, col]);
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
  board.recieveAttack([row, col]);
};

main.addEventListener("click", (e) => {
  const startButton = e.target.closest("button", "start");
  if (startButton) {
    play();
  }
});

init();
