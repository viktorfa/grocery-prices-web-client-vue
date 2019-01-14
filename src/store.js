import Vue from 'vue'
import Vuex, {
  Store,
} from 'vuex'

import {
  getIndex,
  getObjects,
  getPromotedOffers,
  searchCustomOffers,
} from './api'
import {
  lunrSearch,
  loadIndex,
  loadObjects,
  getProduct,
} from './lunr'
import {
  parseQueryStringFromUrl,
  setQueryStringInPage
} from './lib'

Vue.use(Vuex)

const initialState = {
  promotedProducts: [],
  isSearching: false,
  isLoadingProducts: true,
  queryString: '',
  searchResults: [],
  showPromotedProducts: true,
  errorMessage: '',
  showDrawer: false,
  detailProduct: {},
};

const productMutations = {
  setQueryString: "setQueryString",
  setIsSearching: "setIsSearching",
  setIsLoading: "setIsLoading",
  setShowPromotedProducts: "setShowPromotedProducts",
  loadSearchResults: "loadSearchResults",
  clearSearchResults: "clearSearchResults",
  loadPromotedProducts: "loadPromotedProducts",
  setErrorMessage: "setErrorMessage",
  setDetailProduct: 'setDetailProduct',
}

const uiMutations = {
  setShowDrawer: 'setShowDrawer',
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
  [productMutations.clearSearchResults](state) {
    state.searchResults = [];
  },
  [productMutations.loadSearchResults](state, searchResults) {
    state.searchResults = [...state.searchResults, ...searchResults];
  },
  [productMutations.loadPromotedProducts](state, promotedProducts) {
    state.promotedProducts = promotedProducts;
  },
  [productMutations.setErrorMessage](state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  [productMutations.setDetailProduct](state, detailProduct) {
    state.detailProduct = detailProduct;
  },
  [uiMutations.setShowDrawer](state, showDrawer) {
    state.showDrawer = showDrawer;
  },
}

const productActions = {
  FETCH_INDEX_AND_PRODUCTS: 'FETCH_INDEX_AND_PRODUCTS',
  EXECUTE_SEARCH_QUERY: 'EXECUTE_SEARCH_QUERY',
  INITIALIZE_PRODUCTS: 'INITIALIZE_PRODUCTS',
  LOAD_PROMOTED_PRODUCTS: 'LOAD_PROMOTED_PRODUCTS',
  LOAD_DETAIL_PRODUCT: 'LOAD_DETAIL_PRODUCT',
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
  async [productActions.LOAD_PROMOTED_PRODUCTS]({
    commit,
  }) {
    console.log('LOAD_PROMOTED_PRODUCTS')
    const {
      ok,
      data,
      error,
    } = await getPromotedOffers()
    if (ok) {
      commit(productMutations.loadPromotedProducts, data);
    } else {
      commit(productMutations.setErrorMessage(error));
    }
    console.log('LOAD_PROMOTED_PRODUCTS finish')
  },
  async [productActions.FETCH_INDEX_AND_PRODUCTS]({
    commit,
    dispatch,
  }, payload) {
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
      if (payload && payload.isRetry) {
        commit(productMutations.setErrorMessage, "Could not load index")
      } else {
        console.warn('fail reading json output')
        dispatch(productActions.FETCH_INDEX_AND_PRODUCTS, {
          isRetry: true
        })
      }
    }
    commit(productMutations.setIsLoading, false);
    return;
  },
  async [productActions.EXECUTE_SEARCH_QUERY]({
    commit,
  }, {
    queryString,
    setUrl,
  }) {
    commit(productMutations.setIsSearching, true);
    commit(productMutations.clearSearchResults);
    console.log('EXECUTE_SEARCH_QUERY')
    console.log(queryString)

    const lunrPromise = lunrSearch(queryString)
    const strapiPromise = searchCustomOffers(queryString)

    lunrPromise.then(({
      ok,
      data,
      error
    }) => {
      if (ok) {
        commit(productMutations.setShowPromotedProducts, false);
        commit(productMutations.loadSearchResults, data);
        if (setUrl !== false) {
          setQueryStringInPage(queryString)
        }
      } else {
        commit(productMutations.setErrorMessage, error);
      }
    })
    strapiPromise.then(({
      ok,
      data,
      error
    }) => {
      if (ok) {
        commit(productMutations.setShowPromotedProducts, false);
        commit(productMutations.loadSearchResults, data);
        if (setUrl !== false) {
          setQueryStringInPage(queryString)
        }
      } else {
        commit(productMutations.setErrorMessage, error);
      }
    })

    Promise.all([lunrPromise, strapiPromise]).then(() => {
      commit(productMutations.setIsSearching, false);
    })
  },
  async [productActions.LOAD_DETAIL_PRODUCT]({
    commit
  }, {
    id
  }) {
    const {
      ok,
      data,
      error,
    } = await getProduct(id);
    if (ok) {
      commit(productMutations.setDetailProduct, data)
    } else {
      commit(productMutations.setErrorMessage, error)
    }
  },
}

export default new Store({
  state: initialState,
  mutations,
  actions,
});