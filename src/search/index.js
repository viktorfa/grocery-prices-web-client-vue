import lunr from "lunr";

import { getProductFromSearchResult } from "../helpers";

let index = null;
let objects = null;

const objectsLoadedEvent = new Event("objectsloaded");
const indexLoadedEvent = new Event("indexloaded");

const objectsLoaded = new Promise((resolve) => {
  document.addEventListener("objectsloaded", resolve);
});
const indexLoaded = new Promise((resolve) => {
  document.addEventListener("indexloaded", resolve);
});

export const getLunrQueryString = (query) =>
  query.startsWith("+") ? query : `${query} ${query}~1 ${query}* *${query}`;

export const loadIndex = (storedIndex) => {
  index = lunr.Index.load(storedIndex);
  document.dispatchEvent(indexLoadedEvent);
};
export const loadObjects = (storedObjects) => {
  objects = storedObjects;
  document.dispatchEvent(objectsLoadedEvent);
};
export const lunrSearch = async (query) => {
  if (!query || query === "") {
    console.warn("Empty search string");
    return {
      ok: false,
      error: "empty search string",
    };
  }
  await Promise.all([indexLoaded, objectsLoaded]);
  if (index && index.search && objects) {
    const searchResults = index.search(getLunrQueryString(query));
    const result = searchResults.map((result) =>
      getProductFromSearchResult(result, objects),
    );
    return {
      ok: true,
      data: result,
    };
  } else {
    return {
      ok: false,
      error: "Not loaded",
    };
  }
};

export const getProduct = async (id) => {
  await objectsLoaded;
  if (objects) {
    const result = objects[id];
    if (result) {
      return {
        ok: true,
        data: result,
      };
    }
    return {
      ok: false,
      error: `No products with id ${id}`,
    };
  }
  return {
    ok: false,
    error: "Not loaded",
  };
};
