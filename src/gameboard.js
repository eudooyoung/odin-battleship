import Ship from "./ship.js";

export default class Gameboard {
  #ships;
  #occupied;
  #hitSet;
  #missed;
  #sunk;

  constructor() {
    this.#ships = new Map();
    this.#occupied = new Set();
    this.#hitSet = new Set();
    this.#missed = new Set();
    this.#sunk = new Set();
  }

  placeShip = (start, typeCode, isVertical = true) => {
    if (!this.#isCoordValid(start)) {
      throw new RangeError("The given start coordinate is inappropriate");
    }

    const ship = new Ship(typeCode);
    if (this.#ships.has(typeCode)) {
      throw new Error("The ship has already been used");
    }

    this.#ships.set(typeCode, { ship: ship, coords: new Array() });
    const coords = this.#ships.get(typeCode).coords;
    const occupied = this.#occupied;
    const row = start[0];
    const col = start[1];

    if (isVertical) {
      if (!this.#isCoordValid([row + ship.length - 1, col])) {
        this.ships.delete(typeCode);
        throw new RangeError("Ship coordinates exceed the board");
      }
      for (let i = 0; i < ship.length; i++) {
        const coord = [row + i, col];
        const coordStr = JSON.stringify(coord);
        if (occupied.has(coordStr)) {
          this.#rollBackPlacingShip(typeCode);
          throw Error("The coordinate has already been occupied");
        }
        coords.push(coordStr);
        occupied.add(coordStr);
      }
    }

    if (!isVertical) {
      if (!this.#isCoordValid([row, col + ship.length - 1])) {
        this.ships.delete(typeCode);
        throw new RangeError("Ship coordinates exceed the board");
      }
      for (let i = 0; i < ship.length; i++) {
        const coord = [row, col + i];
        const coordStr = JSON.stringify(coord);
        if (occupied.has(coordStr)) {
          this.#rollBackPlacingShip(typeCode);
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
    const hitSet = this.#hitSet;
    const missed = this.#missed;

    if (hitSet.has(targetStr) || missed.has(targetStr)) {
      throw Error("The square has already been attacked");
    }

    for (let status of this.#ships.values()) {
      const ship = status.ship;
      const coords = status.coords;
      if (coords.includes(targetStr)) {
        ship.hit();
        hitSet.add(targetStr);
        if (ship.isSunk) {
          this.#sunk.add(ship.typeCode);
        }
        return ship.type;
      }
    }

    missed.add(targetStr);
    return null;
  };

  #isCoordValid = (coord) => {
    const row = coord[0];
    const col = coord[1];
    if (row < 0 || col < 0) return false;
    if (row > 9 || col > 9) return false;
    return true;
  };

  #rollBackPlacingShip = (typeCode) => {
    this.#ships
      .get(typeCode)
      .coords.forEach((coord) => this.#occupied.delete(coord));
    this.#ships.delete(typeCode);
  };

  get ships() {
    return this.#ships;
  }

  get occupied() {
    return this.#occupied;
  }

  get hitSet() {
    return this.#hitSet;
  }

  get missed() {
    return this.#missed;
  }

  get sunk() {
    return this.#sunk;
  }
}
