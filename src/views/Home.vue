<template>
  <div>
    <div class="text-xs-center offer-search-results">
      <h1 class="offer-search-results-header text-3xl">Utvalgte tilbud</h1>
      <ProductListLoading v-if="isLoadingPromotedProducts" />
      <PromotedProducts v-else :products="promotedProducts" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import PromotedProducts from "../components/PromotedProducts.vue";
import ProductListLoading from "../components/ProductListLoading.vue";

export default {
  name: "MainPage",
  components: {
    PromotedProducts,
    ProductListLoading,
  },
  computed: {
    ...mapState(["promotedProducts", "isLoadingPromotedProducts"]),
  },
};
</script>
