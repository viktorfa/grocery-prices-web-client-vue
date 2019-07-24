<template>
  <div>
    <SearchBarComponent :handleClickMenu="handleClickMenu" />
    <div v-show="!showPromotedProducts">
      <div v-show="isSearching === true" class="text-3xl text-center">
        <p>søker etter</p>
        <strong>{{ queryString }}</strong>
      </div>
      <div
        v-show="searchResults.length === 0 && showSearchResults && !isSearching"
        class="text-3xl text-center"
      >
        <p>Ingen treff på</p>
        <strong>{{ queryString }}</strong>
      </div>
      <div v-show="showSearchResults">
        <SearchResults :results="searchResults" />
      </div>
    </div>
    <div v-show="showPromotedProducts" class="text-xs-center offer-search-results">
      <h1 class="offer-search-results-header text-3xl">Utvalgte tilbud</h1>
      <ProductListLoading v-if="isLoadingPromotedProducts" />
      <PromotedProducts v-else :products="promotedProducts" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import SearchResults from "./SearchResults.vue";
import PromotedProducts from "./PromotedProducts.vue";
import ProductListLoading from "./ProductListLoading.vue";
import SearchBarComponent from "./SearchBarComponent.vue";
import { setQueryStringInPage, setPageTitle } from "../lib";

export default {
  name: "MainPage",
  components: {
    SearchResults,
    PromotedProducts,
    ProductListLoading,
    SearchBarComponent,
  },
  computed: {
    ...mapState([
      "promotedProducts",
      "showPromotedProducts",
      "searchResults",
      "isSearching",
      "queryString",
      "searchQuery",
      "isLoadingPromotedProducts",
    ]),
    showSearchResults() {
      return !this.isSearching && !!this.searchResults;
    },
  },
  watch: {
    searchQuery(newValue) {
      setQueryStringInPage(newValue);
    },
  },
  methods: {
    handleClickMenu: function() {
      this.$store.commit("setShowDrawer", !this.$store.state.showDrawer);
      this.$refs.searchInput.blur();
    },
  },
  mounted() {
    setQueryStringInPage(this.searchQuery);
  },
};
</script>
