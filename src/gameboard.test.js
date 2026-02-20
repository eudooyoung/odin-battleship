import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

describe("gameboard test", () => {
  it("initial state", () => {
    expect(Gameboard).toBeDefined();

    const board = new Gameboard();
    expect(board).toBeInstanceOf(Gameboard);
  });
});
