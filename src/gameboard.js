import Ship from "./ship.js";

export default class Gameboard {
  #ships;
  #ocean;
  #occupied;
  #missed;

  constructor() {
    this.#ships = new Map();
    this.#ocean = new Map();
    this.#occupied = new Set();
    this.#missed = new Set();
  }

  placeShip = (start, typeCode, isVertical = true) => {
    const row = start[0];
    const col = start[1];
    if (!this.#isCoordValid(row, col)) {
      throw new RangeError("The given start coordinate is inappropriate");
    }

    const ship = new Ship(typeCode);
    if (this.#ships.has(typeCode)) {
      throw new Error("The ship has already been used");
    }

    this.#ships.set(typeCode, { ship: ship, coords: new Array() });
    const coords = this.#ships.get(typeCode).coords;
    const occupied = this.#occupied;

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        const coord = [row + i, col];
        const coordStr = JSON.stringify(coord);
        if (occupied.has(coordStr)) {
          this.#ships.get(typeCode).coords.forEach(occupied.delete);
          this.#ships.delete(typeCode);
          throw Error("The coordinate has already been occupied");
        }
        coords.push(coordStr);
        occupied.add(coordStr);
      }
    }

    if (!isVertical) {
      for (let i = 0; i < ship.length; i++) {
        const coord = [row, col + i];
        const coordStr = JSON.stringify(coord);
        if (occupied.has(coordStr)) {
          this.#ships.get(typeCode).coords.forEach(occupied.delete);
          this.#ships.delete(typeCode);
          throw Error("The coordinate has already been occupied");
        }
        coords.push(coordStr);
        occupied.add(coordStr);
      }
    }
  };

  recieveAttack = (target) => {
    const row = target[0];
    const col = target[1];
    if (!this.#isCoordValid(row, col)) {
      throw new RangeError("The ship cannot be placed in range");
    }

    const targetStr = JSON.stringify(target);

    for (let shipCode of this.#ships.keys()) {
      const coordStatus = this.#ocean.get(shipCode);
      if (coordStatus.has(targetStr)) {
        coordStatus.set(targetStr, false);
        const ship = this.#ships.get(shipCode);
        ship.hit();
        if (ship.isSunk) {
          this.#ships.delete(shipCode);
        }
        return true;
      }
    }

    this.#missed.add(targetStr);
    return false;
  };

  #isCoordValid = (row, col) => {
    if (row < 0 || col < 0) return false;
    if (row > 9 || col > 9) return false;
    return true;
  };

  get ships() {
    return this.#ships;
  }

  get ocean() {
    return this.#ocean;
  }

  get occupied() {
    return this.#occupied;
  }

  get missed() {
    return this.#missed;
  }
}
