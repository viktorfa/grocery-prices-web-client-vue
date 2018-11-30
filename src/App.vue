<template>
  <div id="app">
    <form v-on:submit="executeQuery">
      <input class="search-input" v-model="queryInput" label="Søk" type="search" autofocus>
    </form>
    <p v-if="isSearching === true">
      søker etter
      <strong>{{queryInput}}</strong> ...
    </p>
    <SearchResults v-if="searchResults.length > 0" v-bind:results="searchResults"/>
    <div v-if="showPromotedProducts">
      <h1>Utvalgte tilbud</h1>
      <SearchResultList v-bind:results="promotedProducts"/>
    </div>
    <h2
      v-if="searchResults.length === 0 && queryInput && isSearching !== true"
    >Ingen treff på "{{queryInput}}"</h2>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
import lunr from "lunr";
import { mapState } from "vuex";
import { setQueryStringInPage } from "./lib";

import SearchResults from "./components/SearchResults.vue";
import SearchResultList from "./components/SearchResultList.vue";

export default Vue.component("app", {
  components: {
    SearchResults,
    SearchResultList
  },
  data() {
    return { queryInput: this.$store.state.queryString };
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
        //this.loading = true;
        //handleQueryChange(newValue);
        //this.debouncedQuery(newValue, this.products);
      } else if (!newValue || (newValue && newValue.length === 0)) {
        setQueryStringInPage("");
      }
    }
  },
  methods: {
    executeQuery: async function(event) {
      event.preventDefault();
      if (this.queryInput && this.queryInput.length > 0) {
        this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
          queryString: this.queryInput
        });
      }
    }
  }
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1024px;
  margin: auto;
}
.search-input {
  font-size: 1.4rem;
  width: 100%;
  max-width: 768px;
}
</style>
