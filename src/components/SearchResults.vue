<template>
<div>
  <br/>
  <div
    v-if="offers.length > 0"
  >
    <h1>{{offers.length}} Tilbud</h1>
    <div
      class="result-list"
    >
      <SearchResultItem
        v-for="offer in offers"
        v-bind:price="offer.pricing.price"
        v-bind:title="offer.heading"
        v-bind:image_url="offer.images.view"
        v-bind:subtitle="offer.branding.name"
        v-bind:href="offer.images.zoom"
        v-bind:key="offer.id"
      />
    </div>
    <br/>
  </div>
  <div
    v-if="kolonialProducts.length > 0"
  >
  <h1>{{kolonialProducts.length}} {{`${kolonialProducts.length > 1 ? 'varer' : 'vare'}`}} fra kolonial.no</h1>
  <div
    class="result-list"
  >
    <SearchResultItem
      v-for="product in kolonialProducts"
      v-bind:price="product.price"
      v-bind:title="product.title"
      v-bind:image_url="product.image_url"
      v-bind:subtitle="product.product_variant"
      v-bind:href="product.product_url"
      v-bind:key="product.id"
    />
  </div>
  </div>
  <div
    v-if="menyProducts.length > 0"
  >
  <h1>{{menyProducts.length}} {{`${menyProducts.length > 1 ? 'varer' : 'vare'}`}} fra meny.no</h1>
  <div
    class="result-list"
  >
    <SearchResultItem
      v-for="product in menyProducts"
      v-bind:price="product.price"
      v-bind:title="product.title"
      v-bind:image_url="product.image_url"
      v-bind:subtitle="product.product_variant"
      v-bind:href="product.product_url"
      v-bind:key="product.id"
    />
  </div>
  </div>
  <div
    v-if="europrisProducts.length > 0"
  >
  <h1>{{europrisProducts.length}} {{`${europrisProducts.length > 1 ? 'varer' : 'vare'}`}} fra europris.no</h1>
  <div
    class="result-list"
  >
    <SearchResultItem
      v-for="product in europrisProducts"
      v-bind:price="product.price"
      v-bind:title="product.name"
      v-bind:image_url="product.image_url"
      v-bind:subtitle="product.description"
      v-bind:href="product.link"
      v-bind:key="product.id"
    />
  </div>
  </div>
</div>
</template>


<script>
import _ from "lodash";
import SearchResultItem from "./SearchResultItem";

const isOffer = result => result.source === "shopgun";
const isKolonial = result => result.source === "kolonial";
const isMeny = result => result.source === "meny";
const isEuropris = result => result.source === "europris";
const sortResults = results => _.sortBy(results, result => -result.score);
const limitResults = (results, limit = 20) => _.take(results, limit);

export default {
  name: "SearchResults",
  components: {
    SearchResultItem
  },
  props: {
    results: Array
  },
  computed: {
    offers: function() {
      return limitResults(sortResults(this.results.filter(isOffer))) || [];
    },
    kolonialProducts: function() {
      console.log("kolonial computed starting");
      const startTime = new Date().getTime();
      const result =
        limitResults(sortResults(this.results.filter(isKolonial))) || [];
      console.log("kolonial computed finished");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
      return result;
    },
    menyProducts: function() {
      console.log("meny computed starting");
      const startTime = new Date().getTime();
      const result =
        limitResults(sortResults(this.results.filter(isMeny))) || [];
      console.log("meny computed finished");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
      return result;
    },
    europrisProducts: function() {
      return limitResults(sortResults(this.results.filter(isEuropris))) || [];
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
