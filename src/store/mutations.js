export const productMutations = {
  setQueryString: 'setQueryString',
  setIsSearching: 'setIsSearching',
  setIsLoading: 'setIsLoading',
  setShowPromotedProducts: 'setShowPromotedProducts',
  loadSearchResults: 'loadSearchResults',
  clearSearchResults: 'clearSearchResults',
  loadPromotedProducts: 'loadPromotedProducts',
  setErrorMessage: 'setErrorMessage',
  setDetailProduct: 'setDetailProduct',
};

export const uiMutations = {
  setShowDrawer: 'setShowDrawer',
};

export const mutations = {
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
};
