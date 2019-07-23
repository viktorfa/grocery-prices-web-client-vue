import Vue from "vue";
import Vuex, { Store } from "vuex";

import { actions } from "./actions";
import { mutations } from "./mutations";

Vue.use(Vuex);

const initialState = {
  promotedProducts: [],
  isSearching: false,
  queryString: "",
  searchQuery: "",
  isLoadingPromotedProducts: true,
  isLoadingSimilarProducts: false,
  isLoadingDetailProduct: false,
  searchResults: [],
  similarProducts: [],
  showPromotedProducts: true,
  errorMessage: "",
  showDrawer: false,
  detailProduct: null,
};

export default new Store({
  state: initialState,
  mutations,
  actions,
});
