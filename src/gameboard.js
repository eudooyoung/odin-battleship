import Ship from "./ship.js";

export default class Gameboard {
  #ocean;
  #missed;
  #ships;

  constructor() {
    this.#ocean = new Map();
    this.#missed = new Set();
    this.#ships = new Set();
  }

  placeShip = (coord, length, isVertical = true) => {
    const row = coord[0];
    const col = coord[1];
    if (!this.#isCoordValid(row, col)) {
      throw new RangeError("The ship cannot be placed in range");
    }

    const ship = new Ship(length);
    if (isVertical) {
      if (row + length > 9) {
        throw new RangeError("The ship cannot be placed in range");
      }
      for (let i = 0; i < length; i++) {
        if (this.#ocean[row + i][col] instanceof Ship) {
          throw new Error("The square is already occupied");
        }
      }

      for (let i = 0; i < length; i++) {
        this.#ocean[row + i][col] = ship;
      }
    }

    if (!isVertical) {
      if (col + length > 9) {
        throw new RangeError("The ship cannot be placed in range");
      }
      for (let i = 0; i < length; i++) {
        if (this.#ocean[row][col + i] instanceof Ship) {
          throw new Error("The square is already occupied");
        }
      }
      for (let i = 0; i < length; i++) {
        this.#ocean[row][col + i] = ship;
      }
    }

    this.#ships.add(ship);
  };

  recieveAttack = (coord) => {
    const row = coord[0];
    const col = coord[1];
    if (!this.#isCoordValid(row, col)) {
      throw new RangeError("The ship cannot be placed in range");
    }

    const square = this.#ocean[row][col];
    if (square instanceof Ship) {
      square.hit();
      return true;
    }

    if (!square) {
      this.#ocean[row][col] = "miss";
      this.#missed.add(JSON.stringify(coord));
      return false;
    }
  };

  #isCoordValid = (row, col) => {
    if (row < 0 || col < 0) return false;
    if (row > 9 || col > 9) return false;
    return true;
  };

  get ocean() {
    return this.#ocean;
  }

  get missed() {
    return this.#missed;
  }

  get ships() {
    return this.#ships;
  }
}
