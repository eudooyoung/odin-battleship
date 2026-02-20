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
    expect(board.ocean).toEqual(new Array(10).fill().map(() => new Array(10)));
  });

  it("placeShip function", () => {
    board.placeShip([0, 0], 3, true);
    expect(board.ocean[0][0]).toBe(board.ocean[1][0]);
    expect(board.ocean[1][0]).toBe(board.ocean[2][0]);

    board.placeShip([0, 1], 3);
    expect(board.ocean[0][1]).toBe(board.ocean[0][2]);
    expect(board.ocean[0][2]).toBe(board.ocean[0][3]);

    expect(() => board.placeShip([0, 0], 3, true)).toThrow(Error);
    expect(() => board.placeShip([0, 7], 5)).toThrow(RangeError);
    expect(() => board.placeShip([-1, 3], 3)).toThrow(RangeError);
    expect(() => board.placeShip([11, 5], 3)).toThrow(RangeError);
  });
});
