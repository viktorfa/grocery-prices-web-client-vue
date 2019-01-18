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
      loading="isSearching"
      class="search-input"
      :items="autocomplete"
      @change="handleAutocompleteChange"
      append-icon="null"
    ></v-combobox>
    <p v-if="isSearching === true">
      søker etter
      <strong>{{queryInput}}</strong> ...
    </p>
    <SearchResults v-if="searchResults.length > 0" v-bind:results="searchResults"/>
    <div v-if="showPromotedProducts" class="text-xs-center offer-search-results">
      <h1 class="offer-search-results-header">Utvalgte tilbud</h1>
      <SearchResultList v-bind:results="promotedProducts"/>
    </div>
    <h2
      v-if="searchResults.length === 0 && queryInput && isSearching !== true"
    >Ingen treff på "{{queryInput}}"</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setQueryStringInPage } from "../lib";
import { isMobileOrTablet } from "../helpers";
import { getHints } from "@/autocomplete";
import _ from "lodash";

import SearchResults from "./SearchResults.vue";
import SearchResultList from "./SearchResultList.vue";

export default {
  name: "MainPage",
  components: {
    SearchResults,
    SearchResultList
  },
  data() {
    return {
      queryInput: this.$route.params.query || this.$store.state.queryString,
      searchInput: "",
      autocomplete: getHints()
    };
  },
  computed: {
    ...mapState([
      "promotedProducts",
      "showPromotedProducts",
      "searchResults",
      "isSearching",
      "isLoadingProducts"
    ])
  },
  watch: {
    queryInput: function(newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        this.$store.commit("setQueryString", newValue);
        this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
          queryString: newValue
        });
      } else if (!newValue || (newValue && newValue.length === 0)) {
        setQueryStringInPage("");
      }
    },
    searchInput(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.autocomplete = getHints(newValue);
      }
    }
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
    }
  },
  mounted() {
    if (this.queryInput && this.queryInput.length > 0) {
      this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
        queryString: this.queryInput
      });
    }
  }
};
</script>

<style>
</style>
