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
  });

  it.only("placeShip function", () => {
    board.placeShip([0, 0], 0);
    const ship = board.ships.get(0).ship;
    expect(ship.type).toBe("CARRIER");
    const coords = board.ships.get(0).coords;
    for (let i = 0; i < ship.length; i++) {
      expect(coords[i]).toBe(`[${i},0]`);
    }

    board.placeShip([0, 1], 1, false);
    const ship2 = board.ships.get(1).ship;
    expect(ship2.type).toBe("BATTLESHIP");
    const coords2 = board.ships.get(1).coords;
    for (let i = 0; i < ship2.length; i++) {
      expect(coords2[i]).toBe(`[0,${1 + i}]`);
    }
  });

  it.only("placeShip errors", () => {
    board.placeShip([3, 3], 0);

    // cannot place duplicate type of ship
    expect(() => board.placeShip([0, 5], 0)).toThrow(Error);
    // cannot place a ship overlaping another
    expect(() => board.placeShip([1, 3], 1)).toThrow(
      Error("The coordinate has already been occupied"),
    );
    expect(board.ships.has(1)).toBe(false);
    // cannot place a ship out of board
    expect(() => board.placeShip([9, 9], 1)).toThrow(Error);
    expect(board.ships.has(1)).toBe(false);
  });

  it("recieveAttack function", () => {
    board.placeShip([0, 0], 0);
    expect(board.recieveAttack([0, 0])).toBe("CARRIER");
    expect(board.recieveAttack([1, 0])).toBe("CARRIER");
    expect(board.recieveAttack([2, 0])).toBe("CARRIER");
    expect(board.recieveAttack([3, 0])).toBe("CARRIER");
    expect(board.recieveAttack([4, 0])).toBe("CARRIER");

    expect(board.recieveAttack([0, 3])).toBeNull();

    expect(() => board.recieveAttack([-1, -3])).toThrow(RangeError);
    expect(() => board.recieveAttack([11, 10])).toThrow(RangeError);
    expect(() => board.recieveAttack([0, 0])).toThrow(Error);
  });

  it("missed attacks tracking", () => {
    expect(board.missed).toBeInstanceOf(Set);
    board.recieveAttack([0, 0]);
    expect(board.missed.has("[0,0]")).toBe(true);
    board.recieveAttack([0, 1]);
    expect(board.missed.has("[0,1]")).toBe(true);
  });

  it("sunk ships tracking", () => {
    board.placeShip([0, 0], 0);
    expect(board.ships.get(0).ship.isSunk).toBe(false);
    board.placeShip([0, 1], 1);
    for (let i = 0; i < 5; i++) {
      board.recieveAttack([i, 0]);
    }
    for (let i = 0; i < 4; i++) {
      board.recieveAttack([i, 1]);
    }
    expect(board.ships.get(0).ship.isSunk).toBe(true);
    expect(board.sunk.has(0)).toBe(true);
    expect(board.sunk.has(1)).toBe(true);
  });
});
