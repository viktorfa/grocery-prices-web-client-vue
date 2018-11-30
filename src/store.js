import Vue from 'vue'
import Vuex, {
  Store,
} from 'vuex'

import bestOffers from './assets/best-offers.json'
import {
  getIndex,
  getObjects,
} from './api'
import {
  bestOfferToOffer,
} from './helpers'
import {
  lunrSearch,
  loadIndex,
  loadObjects
} from './lunr'
import {
  parseQueryStringFromUrl,
  setQueryStringInPage
} from './lib'

Vue.use(Vuex)

const initialState = {
  promotedProducts: Object.entries(bestOffers).map(bestOfferToOffer),
  isSearching: false,
  isLoadingProducts: true,
  queryString: '',
  searchResults: [],
  showPromotedProducts: true,
  errorMessage: '',
};

const productMutations = {
  setQueryString: "setQueryString",
  setIsSearching: "setIsSearching",
  setIsLoading: "setIsLoading",
  setShowPromotedProducts: "setShowPromotedProducts",
  loadSearchResults: "loadSearchResults",
  setErrorMessage: "setErrorMessage",
}

const mutations = {
  [productMutations.setQueryString](state, queryString) {
    state.queryString = queryString;
  },
  [productMutations.setIsSearching](state, isSearching) {
    state.isSearching = isSearching;
  },
  [productMutations.setIsLoading](state, isLoading) {
    state.isLoading = isLoading;
  },
  [productMutations.setShowPromotedProducts](state, showPromotedProducts) {
    state.showPromotedProducts = showPromotedProducts;
  },
  [productMutations.loadSearchResults](state, searchResults) {
    state.searchResults = searchResults;
  },
  [productMutations.setErrorMessage](state, errorMessage) {
    state.errorMessage = errorMessage;
  },
}

const productActions = {
  FETCH_INDEX_AND_PRODUCTS: 'FETCH_INDEX_AND_PRODUCTS',
  EXECUTE_SEARCH_QUERY: 'EXECUTE_SEARCH_QUERY',
  INITIALIZE_PRODUCTS: 'INITIALIZE_PRODUCTS',
}

const actions = {
  async [productActions.INITIALIZE_PRODUCTS]({
    dispatch,
    commit
  }) {
    console.log('INITIALIZE_PRODUCTS')
    const urlQueryString = parseQueryStringFromUrl()
    if (urlQueryString && urlQueryString.length > 0) {
      commit(productMutations.setQueryString, urlQueryString)
      commit(productMutations.setIsSearching, true)
    }
    await dispatch(productActions.FETCH_INDEX_AND_PRODUCTS);
    if (urlQueryString && urlQueryString.length > 0) {
      dispatch(productActions.EXECUTE_SEARCH_QUERY, {
        queryString: urlQueryString
      })
    }
    console.log('INITIALIZE_PRODUCTS finish')
  },
  async [productActions.FETCH_INDEX_AND_PRODUCTS]({
    commit
  }) {
    commit(productMutations.setIsLoading, true);
    let startTime = new Date().getTime();
    const [objectOption, indexOption] = await Promise.all([
      getObjects(),
      getIndex()
    ]);
    console.log("finish fetching objects");
    console.log(`time elapsed: ${new Date().getTime() - startTime}`);
    if (objectOption.ok && indexOption.ok) {
      startTime = new Date().getTime();
      console.log("start parsing objects");
      loadIndex(indexOption.data)
      loadObjects(objectOption.data)
      console.log("finish parsing objects");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
    } else {
      commit(productMutations.setErrorMessage, "Could not load index")
    }
    commit(productMutations.setIsLoading, false);
    return;
  },
  async [productActions.EXECUTE_SEARCH_QUERY]({
    commit,
  }, {
    queryString
  }) {
    commit(productMutations.setIsSearching, true);
    console.log('EXECUTE_SEARCH_QUERY')
    console.log(queryString)
    const {
      ok,
      data,
      error
    } = await lunrSearch(queryString)
    if (ok) {
      commit(productMutations.setShowPromotedProducts, false);
      commit(productMutations.loadSearchResults, data);
      setQueryStringInPage(queryString)
    } else {
      commit(productMutations.setErrorMessage, error);
    }
    commit(productMutations.setIsSearching, false);

  },
}

export default new Store({
  state: initialState,
  mutations,
  actions,
});