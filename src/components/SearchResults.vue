<template>
<div>
  <div
    v-if="offers.length > 0"
  >
    <h1>{{offers.length}} Tilbud</h1>
    <SearchResultList
      v-bind:results="offers"
    />
    <br/>
  </div>
  <div
    v-if="kolonialProducts.length > 0"
  >
  <h1>{{kolonialProducts.length}} {{`${kolonialProducts.length > 1 ? 'varer' : 'vare'}`}} fra kolonial.no</h1>
  <SearchResultList
      v-bind:results="kolonialProducts"
    />
  </div>
  <div
    v-if="menyProducts.length > 0"
  >
  <h1>{{menyProducts.length}} {{`${menyProducts.length > 1 ? 'varer' : 'vare'}`}} fra meny.no</h1>
  <SearchResultList
      v-bind:results="menyProducts"
    />
  </div>
  <div
    v-if="europrisProducts.length > 0"
  >
  <h1>{{europrisProducts.length}} {{`${europrisProducts.length > 1 ? 'varer' : 'vare'}`}} fra europris.no</h1>
  <SearchResultList
      v-bind:results="europrisProducts"
    />
  </div>
</div>
</template>


<script>
import _ from "lodash";
import SearchResultItem from "./SearchResultItem";
import SearchResultList from "./SearchResultList";

const isOffer = result => result.source === "shopgun" || result.source === "custom";
const isKolonial = result => result.source === "kolonial";
const isMeny = result => result.source === "meny";
const isEuropris = result => result.source === "europris";
const sortResults = results => _.sortBy(results, result => -result.score);
const limitResults = (results, limit = 20) => _.take(results, limit);

export default {
  name: "SearchResults",
  components: {
    SearchResultItem,
    SearchResultList
  },
  props: {
    results: Array
  },
  computed: {
    offers: function() {
      return sortResults(this.results.filter(isOffer)) || [];
    },
    kolonialProducts: function() {
      console.log("kolonial computed starting");
      const startTime = new Date().getTime();
      const result = sortResults(this.results.filter(isKolonial)) || [];
      console.log("kolonial computed finished");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
      return result;
    },
    menyProducts: function() {
      console.log("meny computed starting");
      const startTime = new Date().getTime();
      const result = sortResults(this.results.filter(isMeny)) || [];
      console.log("meny computed finished");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
      return result;
    },
    europrisProducts: function() {
      return sortResults(this.results.filter(isEuropris)) || [];
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
