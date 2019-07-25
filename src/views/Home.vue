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
import { getAllMetaInfo } from "../meta-tags";

export default {
  name: "MainPage",
  components: {
    PromotedProducts,
    ProductListLoading,
  },
  metaInfo: {
    ...getAllMetaInfo(),
  },
  computed: {
    ...mapState(["promotedProducts", "isLoadingPromotedProducts"]),
  },
};
</script>
