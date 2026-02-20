import Ship from "./ship.js";

export default class Gameboard {
  ocean;

  constructor() {
    this.ocean = new Array(10).fill().map(() => new Array(10));
  }

  placeShip = (coord, length, isVertical = false) => {
    const row = coord[0];
    const col = coord[1];
    const ship = new Ship(length);
    if (isVertical) {
      for (let i = 0; i < length; i++) {
        this.ocean[row + i][col] = ship;
      }
    }

    if (!isVertical) {
      for (let i = 0; i < length; i++) {
        this.ocean[row][col + i] = ship;
      }
    }
  };
}
