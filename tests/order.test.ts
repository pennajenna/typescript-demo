import { describe, it, expect } from "vitest";
import { calculateTotal } from "../src/order.js";

describe("calculateTotal", () => {
  it("calculates an order with multiple items", () => {
    const items = [
      { name: "Laptop", price: 1200, quantity: 1 },
      { name: "Mouse", price: 25, quantity: 2 }
    ];

    expect(calculateTotal(items)).toBe(1250);
  });

  it("returns zero for an empty order", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("handles multiple quantities", () => {
    const items = [
      { name: "Keyboard", price: 75, quantity: 3 }
    ];

    expect(calculateTotal(items)).toBe(225);
  });
});