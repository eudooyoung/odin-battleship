export default class Ship {
  static #TYPES = [
    { name: "CARRIER", length: 5 },
    { name: "BATTLESHIP", length: 4 },
    { name: "DESTOYER", length: 3 },
    { name: "SUBMARINE", length: 3 },
    { name: "PATROL BOAT", length: 2 },
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
    this.#type = Ship.#TYPES[typeCode].name;
    this.#length = Ship.#TYPES[typeCode].length;
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
