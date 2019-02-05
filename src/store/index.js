import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { actions } from './actions';
import { mutations } from './mutations';

Vue.use(Vuex);

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

export default new Store({
  state: initialState,
  mutations,
  actions,
});
