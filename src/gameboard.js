import Ship from "./ship.js";

export default class Gameboard {
  ocean;

  constructor() {
    this.ocean = new Array(10).fill().map(() => new Array(10));
  }

  placeShip = (coord, length, isVertical = false) => {
    const row = coord[0];
    const col = coord[1];
    if (row < 0 || col < 0) {
      throw new RangeError("The ship cannot be placed in range");
    }
    if (row > 9 || col > 9) {
      throw new RangeError("The ship cannot be placed in range");
    }

    const ship = new Ship(length);
    if (isVertical) {
      if (row + length > 9) {
        throw new RangeError("The ship cannot be placed in range");
      }
      for (let i = 0; i < length; i++) {
        if (this.ocean[row + i][col] instanceof Ship) {
          throw new Error("The square is already occupied");
        }
      }

      for (let i = 0; i < length; i++) {
        this.ocean[row + i][col] = ship;
      }
    }

    if (!isVertical) {
      if (col + length > 9) {
        throw new RangeError("The ship cannot be placed in range");
      }
      for (let i = 0; i < length; i++) {
        if (this.ocean[row][col + i] instanceof Ship) {
          throw new Error("The square is already occupied");
        }
      }
      for (let i = 0; i < length; i++) {
        this.ocean[row][col + i] = ship;
      }
    }
  };
}
