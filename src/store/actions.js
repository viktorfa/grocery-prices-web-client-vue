import _ from "lodash";
import {
  getIndex,
  getObjects,
  getPromotedOffers,
  getCustomProduct,
  getGroceryOffer,
  searchGroceryOffers,
} from "@/api";
import { loadIndex, loadObjects, getProduct } from "@/search";
import { setQueryStringInPage } from "@/lib";
import { isProductUri } from "@/helpers";

import { productMutations } from "./mutations";

export const productActions = {
  FETCH_INDEX_AND_PRODUCTS: "FETCH_INDEX_AND_PRODUCTS",
  EXECUTE_SEARCH_QUERY: "EXECUTE_SEARCH_QUERY",
  LOAD_PROMOTED_PRODUCTS: "LOAD_PROMOTED_PRODUCTS",
  LOAD_DETAIL_PRODUCT: "LOAD_DETAIL_PRODUCT",
};

export const actions = {
  async [productActions.LOAD_PROMOTED_PRODUCTS]({ commit }) {
    console.log("LOAD_PROMOTED_PRODUCTS");
    const { ok, data, error } = await getPromotedOffers();
    if (ok) {
      const filteredProducts = _.uniqBy(
        data,
        (offer) => offer.heading + offer.dealer + offer.pricing.price,
      );
      commit(productMutations.loadPromotedProducts, filteredProducts);
    } else {
      commit(productMutations.setErrorMessage, error);
    }
    console.log("LOAD_PROMOTED_PRODUCTS finish");
  },
  async [productActions.FETCH_INDEX_AND_PRODUCTS](
    { commit, dispatch },
    payload,
  ) {
    commit(productMutations.setIsLoading, true);
    let startTime = new Date().getTime();
    const [objectOption, indexOption] = await Promise.all([
      getObjects(),
      getIndex(),
    ]);
    console.log("finish fetching objects");
    console.log(`time elapsed: ${new Date().getTime() - startTime}`);
    if (objectOption.ok && indexOption.ok) {
      startTime = new Date().getTime();
      console.log("start parsing objects");
      loadIndex(indexOption.data);
      loadObjects(objectOption.data);
      console.log("finish parsing objects");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
    } else {
      if (payload && payload.isRetry) {
        commit(productMutations.setErrorMessage, "Could not load index");
      } else {
        console.warn("fail reading json output");
        dispatch(productActions.FETCH_INDEX_AND_PRODUCTS, {
          isRetry: true,
        });
      }
    }
    commit(productMutations.setIsLoading, false);
    return;
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
      // This is a product URI, should be in loaded products
      const localPromise = getProduct(id);
      const apiPromise = getGroceryOffer(id);
      localPromise.then(({ ok, data, error }) => {
        if (ok) {
          commit(productMutations.setDetailProduct, data);
          return;
        } else {
          commit(productMutations.setErrorMessage, error);
        }
      });
      apiPromise.then(({ ok, data, error }) => {
        if (ok) {
          commit(productMutations.setDetailProduct, data);
          return;
        } else {
          console.warn(`Could not fetch product with uri: ${id}`);
          commit(productMutations.setErrorMessage, error);
        }
      });
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
