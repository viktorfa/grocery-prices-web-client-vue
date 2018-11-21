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
    >Henter priser ...</p>
    <SearchResults
      v-if="lunrResults.length > 0"
      v-bind:results="lunrResults"
    />
    <h2
      v-if="lunrResults.length === 0 && queryInput && loading !== true"
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

import { parseQueryStringFromUrl } from "./lib";

const lunrSearch = (query, index) => index.search(query);

const intitialTitleText = document.querySelector("title").text;
const handleQueryChange = query => {
  if (query && query.length > 0) {
    window.history.pushState({}, null, `/sok/${query}`);
    document.querySelector("title").text = `Priser på "${query}"`;
  } else {
    window.history.pushState({}, null, "/");
    document.querySelector("title").text = intitialTitleText;
  }
};

export default Vue.component("app", {
  components: {
    SearchResults
  },
  data: function() {
    return {
      queryInput: parseQueryStringFromUrl() || "grandis",
      filteredOffers: [],
      loading: true,
      lunrResults: [],
      objects: [],
      index: {}
    };
  },
  watch: {
    queryInput: function(newValue, oldValue) {
      if (newValue && newValue.length > 1 && newValue !== oldValue) {
        this.loading = true;
        handleQueryChange(newValue);
        this.debouncedQuery(newValue, this.products);
      } else if (!newValue || (newValue && newValue.length === 0)) {
        handleQueryChange("");
      }
    }
  },
  created: async function() {
    handleQueryChange(this.queryInput)
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
      handleQueryChange(query);
      if (this.index && this.index.search) {
        const lunrQuery = query.startsWith("+")
          ? query
          : `${query}~1 *${query}* *${query.substring(0, query.length - 1)}*`;
        this.lunrResults = lunrSearch(lunrQuery, this.index).map(result => ({
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
