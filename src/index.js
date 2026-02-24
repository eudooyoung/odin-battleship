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
} from "./dom.js";
import Player from "./player.js";

const players = { player: null, computer: null };

const init = () => {
  const body = document.body;

  renderHeader();
  renderMain();
  renderFooter();

  body.append(header, main, footer);
};

const play = () => {
  const player = (players.player = new Player(true));
  const computer = (players.computer = new Player());

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

  updateOcean(playerBoard);
  updateTarget(computerBoard);
};

const attack = (square) => {
  const computerBoard = players.computer.board;
  const row = square.dataset.rows - 1;
  const col = square.dataset.columns - 1;
  mark(computerBoard.recieveAttack([row, col]), square);
};

main.addEventListener("click", (e) => {
  const startButton = e.target.closest("button", "start");
  if (startButton) {
    play();
  }

  const targetSquare = e.target.closest(".target .square");
  if (targetSquare) {
    if (!players.player || !players.computer) {
      return;
    }
    attack(targetSquare);
  }
});

init();
