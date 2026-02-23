import Ship from "./ship.js";

describe("ship test", () => {
  it("inital state", () => {
    expect(Ship).toBeDefined();

    const ship = new Ship(0);
    expect(ship).toBeInstanceOf(Ship);
    expect(ship.type).toBe("CARRIER");
    expect(ship.length).toBe(5);

    expect(() => new Ship()).toThrow(TypeError);
  });

  it("hit & isSunk functions", () => {
    const ship = new Ship(4);
    expect(ship.isSunk).toBe(false);
    ship.hit();
    ship.hit();
    expect(ship.isSunk).toBe(true);
  });
});
