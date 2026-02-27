export default class Ship {
  static #TYPES = [
    "CARRIER",
    "BATTLESHIP",
    "DESTOYER",
    "SUBMARINE",
    "PATROL BOAT",
  ];
  #typeCode;
  #type;
  #length;
  #hits;
  #isSunk;

  constructor(typeCode) {
    if ((typeCode !== 0 && !typeCode) || typeCode < 0 || typeCode > 4) {
      throw new TypeError("Given typeCode is invalid");
    }

    this.#typeCode = typeCode;
    this.#type = Ship.#TYPES[typeCode];
    switch (typeCode) {
      case 0:
        this.#length = 5;
        break;
      case 1:
        this.#length = 4;
        break;
      case 2:
        this.#length = 3;
        break;
      case 3:
        this.#length = 3;
        break;
      case 4:
        this.#length = 2;
        break;
    }
    this.#hits = 0;
    this.#isSunk = false;
  }

  static get TYPES() {
    return this.#TYPES;
  }

  get type() {
    return this.#type;
  }

  get length() {
    return this.#length;
  }

  get isSunk() {
    return this.#isSunk;
  }

  get typeCode() {
    return this.#typeCode;
  }

  hit = () => {
    this.#hits++;
    this.#isSunk = this.length === this.#hits;
  };
}
