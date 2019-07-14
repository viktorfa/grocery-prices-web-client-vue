<template>
  <div v-if="products.length > 0" class="text-xs-center meny-search-results">
    <h1 class="meny-search-results-header">
      {{ products.length }}
      {{ `${products.length > 1 ? "varer" : "vare"}` }} fra meny.no
    </h1>
    <ProductList :products="products" :showDealerLogo="false" />
  </div>
</template>

<script>
import ProductList from "./ProductList";

export default {
  components: {
    ProductList,
  },
  name: "SearchResultList",
  props: {
    products: Array,
    showDealerLogo: Boolean,
    header: String,
    showSubtitle: Boolean,
  },
};
</script>

<style>
</style>
