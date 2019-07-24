import {
  getAllMetaTags,
  getAllMetaInfoForProduct,
  getProductDescription,
} from "../meta-tags";
import exampleProduct from "../../tests/assets/standard-product.json";

test("getAllMetaTags", () => {
  const argument = {
    title: "Hei",
    description: "Hvordan går det?",
    image_url: "Jo, bra. Takk for det, og du?",
    site_url: "Helt jævlig.",
  };
  const actual = getAllMetaTags(argument);
  expect(actual).toBeTruthy();
  expect(actual).toBeInstanceOf(Array);
});

test("getAllMetaInfoForProduct", () => {
  const actual = getAllMetaInfoForProduct(exampleProduct);
  expect(actual).toBeTruthy();
  expect(actual).toBeInstanceOf(Object);
  expect(actual.title).toBeTruthy();
  expect(typeof actual.title).toBe("string");
  expect(actual.meta).toBeTruthy();
  expect(actual.meta).toBeInstanceOf(Array);
});

test("getProductDescription", () => {
  const product = exampleProduct;
  const actual = getProductDescription(product);
  expect(actual).toBeTruthy();
  expect(typeof actual).toBe("string");
});
