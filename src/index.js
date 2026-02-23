import "./style.css";
import { header, main, footer } from "./dom.js";
import { renderHeader, renderMain, renderFooter, updateOcean } from "./dom.js";
import Player from "./player.js";

const init = () => {
  const body = document.body;

  renderHeader();
  renderMain();
  renderFooter();

  body.append(header, main, footer);
};

const play = () => {
  const player = new Player(true);
  const computer = new Player();

  const playerBoard = player.board;
  playerBoard.placeShip([0, 0], 0);
  playerBoard.placeShip([0, 1], 1);
  playerBoard.placeShip([0, 2], 2);
  playerBoard.placeShip([0, 3], 3);
  playerBoard.placeShip([0, 4], 4);

  updateOcean(playerBoard);
};

main.addEventListener("click", (e) => {
  const startButton = e.target.closest("button", "start");
  if (startButton) {
    play();
  }
});

init();
