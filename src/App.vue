<template>
  <div id="app">
    <v-text-field
      v-model='queryInput'
      label="Søk"
      autofocus
      clearable
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

import { search, objects } from "./lunr";

import OfferList from "./components/OfferList.vue";
import ProductList from "./components/ProductList.vue";
import SearchResults from "./components/SearchResults.vue";
import products from "./assets/kolonial_product_prices.json";
import offers from "./assets/shopgun_offers.json";

const filterProducts = (products, limit = 10) => _.take(products, limit);
const queryProducts = (query, products) => {
  if (products && products.length > 0 && query && query.length > 0) {
    const result = filterProducts(
      products.filter(product => product.title.match(RegExp(query, "gi")))
    );
    return result;
  } else return [];
};

const asyncQueryProducts = async (query, products) => {
  await setTimeout(() => {}, 200);
  return queryProducts(query, products);
};

const queryOffers = (query, offers) => {
  if (offers && offers.length > 0 && query && query.length > 0) {
    const result = filterProducts(
      offers.filter(offer => offer.heading.match(RegExp(query, "gi")))
    );
    return result;
  } else return [];
};

const sunrSearch = query => search(query);

export default Vue.component("app", {
  components: {
    ProductList,
    OfferList,
    SearchResults
  },
  data: function() {
    return {
      products,
      offers,
      queryInput: "grand",
      filteredProducts: [],
      filteredOffers: [],
      loading: false,
      sunrResults: []
    };
  },
  watch: {
    queryInput: function(newValue, oldValue) {
      if (newValue.length > 0 && newValue !== oldValue) {
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
      this.filteredProducts = await asyncQueryProducts(query, this.products);
      this.filteredOffers = queryOffers(query, this.offers);
      this.sunrResults = sunrSearch(`${query}*`).map(result => ({
        ...objects[result.ref],
        score: result.score
      }));
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
</style>
