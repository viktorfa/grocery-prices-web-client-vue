<template>
<div>
  <div
    v-if="offers.length > 0"
  >
  <h3>{{offers.length}} Tilbud</h3>
  <div
    class="result-list"
  >
    <OfferListItem
      v-for="offer in offers"
      v-bind:offer="offer"
      v-bind:key="offer.id"
    />
  </div>
  <hr/>
  </div>
  <div
    v-if="kolonialProducts.length > 0"
  >
  <h3>{{kolonialProducts.length}} varer fra kolonial.no</h3>
  <div
    class="result-list"
  >
    <ProductListItem
      v-for="product in kolonialProducts"
      v-bind:product="product"
      v-bind:key="product.id"
    />
  </div>
  </div>
</div>
</template>


<script>
import _ from "lodash";
import OfferListItem from "./OfferListItem";
import ProductListItem from "./ProductListItem";

const isOffer = result => result.pricing !== undefined;
const isKolonial = result => result.image_url !== undefined;
const sortResults = results => _.sortBy(results, result => -result.score);
const limitResults = (results, limit = 50) => _.take(results, limit);

export default {
  name: "SearchResults",
  components: {
    OfferListItem,
    ProductListItem
  },
  props: {
    results: Array
  },
  computed: {
    offers: function() {
      return limitResults(sortResults(this.results.filter(isOffer))) || [];
    },
    kolonialProducts: function() {
      return limitResults(sortResults(this.results.filter(isKolonial))) || [];
    }
  }
};
</script>

<style>
.result-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
