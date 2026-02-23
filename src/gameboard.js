import Ship from "./ship.js";

export default class Gameboard {
  #ships;
  #ocean;
  #missed;

  constructor() {
    this.#ships = new Map();
    this.#ocean = new Map();
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

    this.#ships.set(typeCode, ship);
    this.#ocean.set(typeCode, new Array());
    const coords = this.#ocean.get(typeCode);

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        const coord = [row + i, col];
        const coordStr = JSON.stringify(coord);
        if (this.#isOverlapping(coordStr)) {
          this.#ships.delete(typeCode);
          this.#ocean.delete(typeCode);
          throw Error("The coordinate has already been occupied");
        }
        coords.push(coordStr);
      }
    }

    if (!isVertical) {
      for (let i = 0; i < ship.length; i++) {
        const coord = [row, col + i];
        const coordStr = JSON.stringify(coord);
        if (this.#isOverlapping(coordStr)) {
          this.#ships.delete(typeCode);
          this.#ocean.delete(typeCode);
          throw Error("The coordinate has already been occupied");
        }
        coords.push(coordStr);
      }
    }
  };

  #isOverlapping = (target) => {
    const occupied = this.#ocean.values();
    for (let coords of occupied) {
      if (coords.includes(target)) return true;
    }
    return false;
  };

  recieveAttack = (target) => {
    const row = target[0];
    const col = target[1];
    if (!this.#isCoordValid(row, col)) {
      throw new RangeError("The ship cannot be placed in range");
    }

    const targetStr = JSON.stringify(target);

    for (let shipCode of this.#ships.keys()) {
      const coords = this.#ocean.get(shipCode);
      if (coords.includes(targetStr)) {
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

  get missed() {
    return this.#missed;
  }
}
