export default class Ship {
  #length;
  #hits;
  #isSunk;

  constructor(length) {
    if (length <= 0 || !Number.isInteger(length)) {
      throw new TypeError(
        "The length of ship should be an integer greater than 0",
      );
    }

    this.#length = length;
    this.#hits = 0;
    this.#isSunk = false;
  }

  get length() {
    return this.#length;
  }

  hit = () => {
    this.#hits++;
    this.#isSunk = this.length === this.#hits;
  };

  get isSunk() {
    return this.#isSunk;
  }
}
