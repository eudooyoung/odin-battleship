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
    expect(board.ocean[0][0]).toBeInstanceOf(Ship);
    expect(board.ocean[1][0]).toBeInstanceOf(Ship);
    expect(board.ocean[2][0]).toBeInstanceOf(Ship);

    board.placeShip([0, 1], 3);
    expect(board.ocean[0][1]).toBeInstanceOf(Ship);
    expect(board.ocean[0][2]).toBeInstanceOf(Ship);
    expect(board.ocean[0][3]).toBeInstanceOf(Ship);
  });
});
