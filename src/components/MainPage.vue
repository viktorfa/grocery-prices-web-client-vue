<template>
  <div>
    <v-combobox
      ref="searchInput"
      v-model="queryInput"
      :search-input.sync="searchInput"
      label="Søk i alle tilbud og 3 nettbutikker"
      type="search"
      autofocus
      solo
      clearable
      prepend-inner-icon="menu"
      @click:prepend-inner="handleClickMenu"
      :loading="isSearching === true"
      class="search-input"
      :items="autocomplete"
      @change="handleAutocompleteChange"
      :menu-props="{
        closeOnClick: false,
        closeOnContentClick: false,
        openOnClick: false,
      }"
    ></v-combobox>
    <div v-show="isSearching === true" class="center-box fixed display-1">
      <p>søker etter</p>
      <strong>{{ queryInput }}</strong>
    </div>
    <div
      v-show="searchResults.length === 0 && showSearchResults && !isSearching"
      class="center-box fixed display-1"
    >
      <p>Ingen treff på</p>
      <strong>{{ queryInput }}</strong>
    </div>
    <div v-show="showSearchResults">
      <SearchResults v-bind:results="searchResults" />
    </div>
    <div v-show="!showSearchResults" class="text-xs-center offer-search-results">
      <h1 class="offer-search-results-header text-3xl">Utvalgte tilbud</h1>
      <PromotedProducts v-bind:products="promotedProducts" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setQueryStringInPage } from "../lib";
import { getHints } from "@/autocomplete";

import SearchResults from "./SearchResults.vue";
import PromotedProducts from "./PromotedProducts.vue";

export default {
  name: "MainPage",
  components: {
    SearchResults,
    PromotedProducts,
  },
  data() {
    return {
      queryInput: this.$route.params.query || this.$store.state.queryString,
      searchInput: "",
      autocomplete: getHints(),
    };
  },
  computed: {
    ...mapState([
      "promotedProducts",
      "showPromotedProducts",
      "searchResults",
      "isSearching",
      "isLoadingProducts",
    ]),
    showSearchResults() {
      return !!this.queryInput;
    },
  },
  watch: {
    queryInput: function(newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        this.$store.commit("setQueryString", newValue);
        this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
          queryString: newValue,
        });
      } else if (!newValue || (newValue && newValue.length === 0)) {
        this.$store.commit("setShowPromotedProducts", true);
        this.$store.commit("setQueryString", "");
        setQueryStringInPage("");
      }
    },
    searchInput(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.autocomplete = getHints(newValue);
      }
    },
  },
  methods: {
    handleAutocompleteChange(newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        this.queryInput = newValue;
        // when selecting from the autoselect, it will go back to the old query on blur, so we must wait for next tick
        this.$nextTick(() => {
          this.$refs.searchInput.blur();
        });
      }
    },
    handleClickMenu: function() {
      this.$store.commit("setShowDrawer", !this.$store.state.showDrawer);
      this.$refs.searchInput.blur();
    },
  },
  mounted() {
    if (this.queryInput && this.queryInput.length > 0) {
      this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
        queryString: this.queryInput,
      });
    }
  },
};
</script>

<style>
.v-autocomplete__content {
  top: 56px !important; /* Autocomplete for type-ahead covers all screen on mobile so we push it down */
}
.v-input__append-inner:last-child {
  /* Remove the dropdown icon on search bar */
  display: none;
}
</style>
