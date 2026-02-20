import Ship from "./ship.js";

describe("ship test", () => {
  it("inital state", () => {
    expect(Ship).toBeDefined();

    const length = 4;
    const ship = new Ship(length);
    expect(ship).toBeInstanceOf(Ship);
    expect(ship.length).toBe(length);

    expect(() => new Ship()).toThrow(TypeError);
  });

  it("hit & isSunk functions", () => {
    const ship = new Ship(2);
    expect(ship.isSunk).toBe(false);
    ship.hit();
    ship.hit();
    expect(ship.isSunk).toBe(true);
  });
});
