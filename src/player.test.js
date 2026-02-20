import Gameboard from "./gameboard.js";
import Player from "./player.js";

describe("player test", () => {
  it("initial state", () => {
    expect(Player).toBeDefined();

    const player = new Player(true);
    expect(player.isReal).toBe(true);
    expect(player.board).toBeInstanceOf(Gameboard);
  });
});
