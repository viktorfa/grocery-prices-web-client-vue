import uniqBy from "lodash/uniqBy";
import {
  getPromotedOffers,
  getCustomProduct,
  getGroceryOffer,
  searchGroceryOffers,
} from "@/api";
import { setQueryStringInPage } from "@/lib";
import { isProductUri } from "@/helpers";

import { productMutations } from "./mutations";

export const productActions = {
  EXECUTE_SEARCH_QUERY: "EXECUTE_SEARCH_QUERY",
  LOAD_PROMOTED_PRODUCTS: "LOAD_PROMOTED_PRODUCTS",
  LOAD_DETAIL_PRODUCT: "LOAD_DETAIL_PRODUCT",
};

export const actions = {
  async [productActions.LOAD_PROMOTED_PRODUCTS]({ commit }) {
    console.log("LOAD_PROMOTED_PRODUCTS");
    const { ok, data, error } = await getPromotedOffers();
    if (ok) {
      const filteredProducts = uniqBy(
        data,
        (offer) => offer.heading + offer.dealer + offer.pricing.price,
      );
      commit(productMutations.loadPromotedProducts, filteredProducts);
    } else {
      commit(productMutations.setErrorMessage, error);
    }
    commit(productMutations.setIsLoadingPromotedProducts, false);
    console.log("LOAD_PROMOTED_PRODUCTS finish");
  },
  async [productActions.EXECUTE_SEARCH_QUERY](
    { commit },
    { queryString, setUrl },
  ) {
    commit(productMutations.setIsSearching, true);
    commit(productMutations.clearSearchResults);
    console.log("EXECUTE_SEARCH_QUERY");
    console.log(queryString);

    const lambdaPromise = searchGroceryOffers(queryString);

    lambdaPromise.then(({ ok, data, error }) => {
      if (ok) {
        commit(productMutations.setShowPromotedProducts, false);
        commit(productMutations.loadSearchResults, data);
        if (setUrl !== false) {
          setQueryStringInPage(queryString);
        }
      } else {
        commit(productMutations.setErrorMessage, error);
      }
    });

    Promise.all([lambdaPromise]).then(() => {
      commit(productMutations.setIsSearching, false);
    });
  },
  async [productActions.LOAD_DETAIL_PRODUCT]({ commit }, { id }) {
    if (isProductUri(id)) {
      commit(productMutations.setIsLoadingDetailProduct, true);

      const { ok, data, error } = await getGroceryOffer(id);

      if (ok) {
        commit(productMutations.setDetailProduct, data);
      } else {
        console.warn(`Could not fetch product with uri: ${id}`);
        commit(productMutations.setErrorMessage, error);
      }
      commit(productMutations.setIsLoadingDetailProduct, false);
    } else {
      // Not product uri, needs to be fetched from Strapi
      const { ok, data, error } = await getCustomProduct(id);
      if (ok) {
        commit(productMutations.setDetailProduct, data);
      } else {
        commit(productMutations.setErrorMessage, error);
      }
    }
  },
};
