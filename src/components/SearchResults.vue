<template>
  <div>
    <div v-if="offers.length > 0" class="text-xs-center offer-search-results">
      <h1 class="offer-search-results-header">{{ offers.length }} tilbud</h1>
      <ProductList :products="offers" :showSubtitle="false" />
      <br />
    </div>
    <div v-if="kolonialProducts.length > 0" class="text-xs-center kolonial-search-results">
      <h1 class="kolonial-search-results-header">
        {{ kolonialProducts.length }}
        {{ `${kolonialProducts.length > 1 ? "varer" : "vare"}` }} fra
        kolonial.no
      </h1>
      <ProductList :products="kolonialProducts" :showDealerLogo="false" />
    </div>
    <div v-if="menyProducts.length > 0" class="text-xs-center meny-search-results">
      <h1 class="meny-search-results-header">
        {{ menyProducts.length }}
        {{ `${menyProducts.length > 1 ? "varer" : "vare"}` }} fra meny.no
      </h1>
      <ProductList :products="menyProducts" :showDealerLogo="false" />
    </div>
    <div v-if="europrisProducts.length > 0" class="text-xs-center europris-search-results">
      <h1 class="europris-search-results-header">
        {{ europrisProducts.length }}
        {{ `${europrisProducts.length > 1 ? "varer" : "vare"}` }} fra
        europris.no
      </h1>
      <ProductList :products="europrisProducts" :showDealerLogo="false" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import ProductList from "./ProductList";
import { getStandardProduct } from "../lib";

const isOffer = (result) =>
  result.provenance === "shopgun" || result.provenance === "custom";
const isKolonial = (result) => result.provenance === "kolonial";
const isMeny = (result) => result.provenance === "meny";
const isEuropris = (result) => result.provenance === "europris";
const sortResults = (results) => _.sortBy(results, (result) => -result.score);

export default {
  name: "SearchResults",
  components: {
    ProductList,
  },
  props: {
    results: Array,
  },
  computed: {
    offers: function() {
      return (
        sortResults(this.results.filter(isOffer)).map(getStandardProduct) || []
      );
    },
    kolonialProducts: function() {
      console.log("kolonial computed starting");
      const startTime = new Date().getTime();
      const result =
        sortResults(this.results.filter(isKolonial)).map(getStandardProduct) ||
        [];
      console.log("kolonial computed finished");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
      return result;
    },
    menyProducts: function() {
      console.log("meny computed starting");
      const startTime = new Date().getTime();
      const result =
        sortResults(this.results.filter(isMeny)).map(getStandardProduct) || [];
      console.log("meny computed finished");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
      return result;
    },
    europrisProducts: function() {
      return (
        sortResults(this.results.filter(isEuropris)).map(getStandardProduct) ||
        []
      );
    },
  },
};
</script>
