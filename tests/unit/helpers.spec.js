import { getProductFromSearchResult, isProductUri } from "@/helpers";

describe("getProductFromSearchResult", () => {
  test("should return an object", () => {
    const heading = "grandiosa";
    const score = 0.5;
    const ref = 123;
    const objects = {
      [ref]: {
        heading,
      },
    };
    const result = {
      score,
      ref,
    };
    const expected = {
      heading,
      score,
      id: ref,
    };
    const actual = getProductFromSearchResult(result, objects);
    expect(actual).toEqual(expected);
  });
  test("should fail gracefully", () => {
    const heading = "grandiosa";
    const score = 0.5;
    const ref = 123;
    const objects = {
      notResultRef: {
        heading,
      },
    };
    const result = {
      score,
      ref,
    };
    const actual = getProductFromSearchResult(result, objects);
    expect(actual).toBeFalsy();
  });
});

describe("isProductUri", () => {
  test("should return true if product uri format", () => {
    expect(isProductUri("shopgun:product:c4bfajYw")).toBeTruthy();
    expect(isProductUri("kolonial:product:240")).toBeTruthy();
    expect(isProductUri("meny:product:7035620032196")).toBeTruthy();
    expect(isProductUri("europris:product:168606")).toBeTruthy();
  });
  test("should return false if mongodb id format", () => {
    expect(isProductUri("5c4b1284aa871b0010bee398")).toBeFalsy();
  });
});
