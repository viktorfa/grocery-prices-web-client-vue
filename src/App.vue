<template>
  <div id="app">
    <form v-on:submit="executeQuery">
      <input
        class="search-input"
        v-model="queryInput"
        label="Søk"
        type="search"
        autofocus
      />
    </form>
    <p
      v-if="loading === true"
    >søker etter <strong>{{queryInput}}</strong> ...</p>
    <SearchResults
      v-if="lunrResults.length > 0"
      v-bind:results="lunrResults"
    />
    <div
        v-if="showInitialOffers"
    >
      <h1>Utvalgte tilbud</h1>
      <SearchResultList
        v-bind:results="initialOffers"
      />
    </div>
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

import bestOffers from "./assets/best-offers.json";
import { getIndex, getObjects } from "./api";

import SearchResults from "./components/SearchResults.vue";
import SearchResultList from "./components/SearchResultList.vue";

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
    SearchResults,
    SearchResultList
  },
  data: function() {
    return {
      queryInput: parseQueryStringFromUrl() || "",
      loading: false,
      lunrResults: [],
      showInitialOffers: true,
      initialOffers: Object.entries(bestOffers).map(([id, offer]) => ({
        ...offer,
        score: offer.rebate,
        source: "shopgun",
        id
      })),
      objects: [],
      index: {}
    };
  },
  watch: {
    queryInput: function(newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        //this.loading = true;
        //handleQueryChange(newValue);
        //this.debouncedQuery(newValue, this.products);
      } else if (!newValue || (newValue && newValue.length === 0)) {
        handleQueryChange("");
      }
    }
  },
  created: async function() {
    if (this.queryInput && this.queryInput.length > 0) this.loading = true;
    this.debouncedQuery = _.debounce(this.queryProducts, 500);
    let startTime = new Date().getTime();
    console.log("start fetching objects");
    const [objectOption, indexOption] = await Promise.all([
      getObjects(),
      getIndex()
    ]);
    console.log("finish fetching objects");
    console.log(`time elapsed: ${new Date().getTime() - startTime}`);
    if (objectOption.ok && indexOption.ok) {
      startTime = new Date().getTime();
      console.log("start parsing objects");
      this.index = lunr.Index.load(indexOption.data);
      this.objects = objectOption.data;
      console.log("finish parsing objects");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
    } else {
      this.message = "Could not load index";
    }
    console.log(Object.values(this.objects).splice(0, 10));
    if (this.queryInput && this.queryInput.length > 0) {
      handleQueryChange(this.queryInput);
      this.queryProducts(this.queryInput);
    }
  },
  methods: {
    executeQuery: async function(event) {
      event.preventDefault();
      if (this.queryInput && this.queryInput.length > 0) {
        this.queryProducts(this.queryInput);
      }
    },
    queryProducts: async function(query) {
      this.showInitialOffers = false;
      this.loading = true;
      console.log("search starting");
      const startTime = new Date().getTime();
      handleQueryChange(query);
      if (this.index && this.index.search) {
        const lunrQuery = query.startsWith("+")
          ? query
          : `${query} ${query}~1 ${query}* *${query.substring(
              0,
              query.length - 1
            )}`;
        this.lunrResults = lunrSearch(lunrQuery, this.index).map(result => ({
          ...this.objects[result.ref],
          id: result.ref,
          score: result.score
        }));
        console.log(this.lunrResults);
        console.log(this.initialOffers);
        console.log("search finished");
        console.log(`time elapsed: ${new Date().getTime() - startTime}`);
        /*
       this.lunrResults = Object.entries(this.objects).splice(0, 10).map(([key, value]) => ({...value, id: key, score: .5}))
       */
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
