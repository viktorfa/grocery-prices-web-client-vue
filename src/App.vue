<template>
  <div id="app">
    <input
      class="search-input"
      v-model="queryInput"
      label="Søk"
      autofocus
    />
    <p
      v-if="loading === true"
    >Loading ...</p>
    <SearchResults
      v-bind:results="sunrResults"
    />
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";

import { search, objects } from "./lunr/premade";

import SearchResults from "./components/SearchResults.vue";

const sunrSearch = query => search(query);

export default Vue.component("app", {
  components: {
    SearchResults
  },
  data: function() {
    return {
      queryInput: "grand",
      filteredOffers: [],
      loading: false,
      sunrResults: []
    };
  },
  watch: {
    queryInput: function(newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        this.loading = true;
        this.debouncedQuery(newValue, this.products);
      }
    }
  },
  created: function() {
    this.queryProducts(this.queryInput);
    this.debouncedQuery = _.debounce(this.queryProducts, 500);
  },
  methods: {
    queryProducts: async function(query) {
      this.sunrResults = sunrSearch(`${query} ${query}* ${query}~1`).map(
        result => ({
          ...objects[result.ref],
          score: result.score
        })
      );
      this.loading = false;
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
}
.search-input {
  font-size: 1.2em
}
</style>
