import Gameboard from "./gameboard";

export default class Player {
  #isReal;
  #board;

  constructor(isReal) {
    this.#isReal = isReal;
    this.#board = new Gameboard();
  }

  get isReal() {
    return this.#isReal;
  }

  get board() {
    return this.#board;
  }
}
