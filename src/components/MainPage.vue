<template>
  <div>
    <v-form @submit.prevent="executeQuery">
      <v-text-field
        ref="searchInput"
        v-model="queryInput"
        label="Søk"
        type="search"
        autofocus
        solo
        clearable
        prepend-inner-icon="menu"
        @click:prepend-inner="handleClickMenu"
        loading="isSearching"
        class="search-input"
      ></v-text-field>
    </v-form>
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

import SearchResults from "./SearchResults.vue";
import SearchResultList from "./SearchResultList.vue";

export default {
  name: "MainPage",
  components: {
    SearchResults,
    SearchResultList
  },
  data() {
    console.log("MainPage data()");
    console.log(this.$route.params.query);
    console.log(this.$store.state.queryString);
    return {
      queryInput: this.$route.params.query || this.$store.state.queryString
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
      } else if (!newValue || (newValue && newValue.length === 0)) {
        setQueryStringInPage("");
      }
    }
  },
  methods: {
    executeQuery: async function() {
      if (this.queryInput && this.queryInput.length > 0) {
        if (isMobileOrTablet()) {
          this.$refs.searchInput.blur();
        }
        this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
          queryString: this.queryInput
        });
      }
    },
    handleClickMenu: function() {
      this.$store.commit("setShowDrawer", !this.$store.state.showDrawer);
      this.$refs.searchInput.blur();
    }
  },
  mounted() {
    this.executeQuery();
  }
};
</script>

<style>
</style>
