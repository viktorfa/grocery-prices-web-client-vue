const STRAPI_URL = 'https://strapi.vikfand.com';
import { getJsonFetchOption, getFullFileUrl } from './util';

export const getIndex = async () => {
  const fileName = 'product-lunr-index-latest.json';
  const response = await fetch(getFullFileUrl(fileName));
  return getJsonFetchOption(response);
};

export const getAutocompleteData = async () => {
  const fileName = 'autocomplete-data-latest.json';
  const response = await fetch(getFullFileUrl(fileName));
  return getJsonFetchOption(response);
};

export const getObjects = async () => {
  const fileName = 'product-map-latest.json';
  const response = await fetch(getFullFileUrl(fileName));
  return getJsonFetchOption(response);
};
export const getCustomProduct = async (id) => {
  const strapiCollectionName = 'customoffers';
  const response = await fetch(`${STRAPI_URL}/${strapiCollectionName}/${id}`);
  return getJsonFetchOption(response);
};
export const getGroceryOffer = async (uri) => {
  const strapiCollectionName = 'groceryoffers';
  const response = await fetch(
    `${STRAPI_URL}/${strapiCollectionName}?uri=${uri}&_limit=1`
  );
  const { ok, data, error } = await getJsonFetchOption(response);
  if (ok && data.length > 0) {
    return {
      ok,
      data: data[0],
    };
  } else {
    return {
      ok: false,
      error,
    };
  }
};
export const getPromotedOffers = async (offerLimit = 30) => {
  const isoNow = new Date().toISOString();
  const strapiCollectionName = 'selectedoffers';
  const strapiUrlParameterString = `run_till_gt=${isoNow}&run_from_lt=${isoNow}&_limit=${offerLimit}&_sort=select_method:DESC`;
  const response = await fetch(
    `${STRAPI_URL}/${strapiCollectionName}?${strapiUrlParameterString}`
  );
  return getJsonFetchOption(response);
};

export const searchCustomOffers = async (query, offerLimit = 10) => {
  const isoNow = new Date().toISOString();
  const strapiCollectionName = 'customoffers';
  const strapiUrlParameterString = `heading_contains=${query}&run_till_gt=${isoNow}&run_from_lt=${isoNow}&_limit=${offerLimit}&_sort=updatedAt:DESC`;
  const response = await fetch(
    `${STRAPI_URL}/${strapiCollectionName}?${strapiUrlParameterString}`
  );
  return getJsonFetchOption(response);
};
export const searchGroceryOffers = async (query) => {
  const url =
    'https://75l1klfn37.execute-api.eu-central-1.amazonaws.com/dev/offers/search';
  const response = await fetch(`${url}/${query}`);
  return getJsonFetchOption(response);
};
