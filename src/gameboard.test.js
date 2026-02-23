import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

describe("gameboard test", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  it("initial state", () => {
    expect(Gameboard).toBeDefined();

    expect(board).toBeInstanceOf(Gameboard);
    expect(board.ocean).toEqual(new Map());
  });

  it("placeShip function", () => {
    board.placeShip([0, 0], 0);
    expect(board.ocean.get(0)).toEqual([
      "[0,0]",
      "[1,0]",
      "[2,0]",
      "[3,0]",
      "[4,0]",
    ]);

    board.placeShip([0, 1], 1, false);
    expect(board.ocean.get(1)).toEqual(["[0,1]", "[0,2]", "[0,3]", "[0,4]"]);

    // can not place duplicate type of ship
    expect(() => board.placeShip([0, 5], 0)).toThrow(Error);
    // can not place a ship overlaping another
    expect(() => board.placeShip([0, 0], 2)).toThrow(Error);
  });

  it("recieveAttack function", () => {
    board.placeShip([0, 0], 0);
    expect(board.recieveAttack([0, 0])).toBe(true);
    expect(board.recieveAttack([1, 0])).toBe(true);
    expect(board.recieveAttack([2, 0])).toBe(true);
    expect(board.recieveAttack([3, 0])).toBe(true);
    expect(board.recieveAttack([4, 0])).toBe(true);

    expect(board.recieveAttack([0, 3])).toBe(false);

    expect(() => board.recieveAttack([-1, -3])).toThrow(RangeError);
    expect(() => board.recieveAttack([11, 10])).toThrow(RangeError);
  });

  it("missed attacks tracking", () => {
    expect(board.missed).toBeInstanceOf(Set);
    board.recieveAttack([0, 0]);
    expect(board.missed.has("[0,0]")).toBe(true);
    board.recieveAttack([0, 1]);
    expect(board.missed.has("[0,1]")).toBe(true);
  });

  it("sunk ships tracking", () => {
    expect(board.ships).toBeInstanceOf(Map);
    board.placeShip([0, 0], 0);
    board.placeShip([0, 1], 1);
    expect(board.ships.size).toBe(2);
    for (let i = 0; i < 5; i++) {
      board.recieveAttack([i, 0]);
    }
    for (let i = 0; i < 4; i++) {
      board.recieveAttack([i, 1]);
    }
    expect(board.ships.size).toBe(0);
  });
});
