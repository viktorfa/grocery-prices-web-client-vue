import { getProductValue } from "@/lib";

describe("getProductValue", () => {
  test("should return a string", () => {
    expect(typeof getProductValue({})).toEqual("string");
  });
  test("should find existing quantity value", () => {
    const product = {
      quantity: {},
      quantity_value: {
        value: 10.0,
        unit: {
          symbol: "kg",
          si: {
            symbol: "kg",
            factor: 1,
          },
        },
      },
    };
    const expected = "10,00 kr/kg";
    const actual = getProductValue(product);
    expect(actual).toEqual(expected);
  });
  test("should find existing pieces value", () => {
    const product = {
      quantity: {},
      piece_value: {
        value: 5,
        unit: {
          symbol: "boks",
        },
      },
    };
    const expected = "5,00 kr/boks";
    const actual = getProductValue(product);
    expect(actual).toEqual(expected);
  });
  test("should calculate quantity value", () => {
    const product = {
      quantity: {
        size: {
          max: 100,
          min: 100,
        },
        unit: {
          symbol: "g",
          si: {
            symbol: "kg",
            factor: 0.001,
          },
        },
      },
      pricing: {
        price: 20.0,
      },
    };
    const expected = "200,00 kr/kg";
    const actual = getProductValue(product);
    expect(actual).toEqual(expected);
  });
  test("should calculate piece value", () => {
    const product = {
      quantity: {
        pieces: {
          max: 4,
          min: 4,
        },
        size: {},
      },
      pricing: {
        price: 100.0,
      },
    };
    const expected = "25,00 kr/stk";
    const actual = getProductValue(product);
    expect(actual).toEqual(expected);
  });
});
