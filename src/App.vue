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
      v-if="sunrResults.length > 0"
      v-bind:results="sunrResults"
    />
    <h2
      v-if="sunrResults.length === 0 && queryInput && loading !== true"
    >
    Ingen treff på "{{queryInput}}"
    </h2>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
import lunr from "lunr";

import { getIndex, getObjects } from "./api";

import SearchResults from "./components/SearchResults.vue";

const sunrSearch = (query, index) => index.search(query);
import { parseQueryStringFromUrl } from "./lib";

export default Vue.component("app", {
  components: {
    SearchResults
  },
  data: function() {
    return {
      queryInput: parseQueryStringFromUrl() || "grandis",
      filteredOffers: [],
      loading: true,
      sunrResults: [],
      objects: [],
      index: {}
    };
  },
  watch: {
    queryInput: function(newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        this.loading = true;
        this.debouncedQuery(newValue, this.products);
      } else if (!newValue || (newValue && newValue.length === 0)) {
        window.history.pushState({}, null, "/");
      }
    }
  },
  created: async function() {
    this.debouncedQuery = _.debounce(this.queryProducts, 500);
    const [objectOption, indexOption] = await Promise.all([
      getObjects(),
      getIndex()
    ]);
    if (objectOption.ok && indexOption.ok) {
      this.index = lunr.Index.load(indexOption.data);
      this.objects = objectOption.data;
    } else {
      this.message = "Could not load index";
    }
    this.queryProducts(this.queryInput);
  },
  methods: {
    queryProducts: async function(query) {
      window.history.pushState({}, null, `/sok/${query}`);
      if (this.index && this.index.search) {
        const lunrQuery = query.startsWith("+")
          ? query
          : `${query}~1 *${query}* *${query.substring(0, query.length - 1)}*`;
        this.sunrResults = sunrSearch(lunrQuery, this.index).map(result => ({
          ...this.objects[result.ref],
          score: result.score
        }));
      } else {
        this.message = "Index is not initalized.";
      }
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
  max-width: 1024px;
  margin: auto;
}
.search-input {
  font-size: 1.4rem;
  width: 100%;
  max-width: 768px;
}
</style>
