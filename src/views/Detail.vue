<template>
  <div>
    <div v-show="isLoadingDetailProduct" class="flex align-center justify-center">
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
    </div>
    <div
      v-show="!isLoadingDetailProduct && detailProductNotFound"
      class="flex flex-col align-center justify-center text-xl"
    >
      <p>Fant ikke tilbud. Mulig varen ikke finnes lenger.</p>
      <p>
        <router-link to="/" replace>Tilbake</router-link>
      </p>
    </div>
    <div class="text-xs-center" v-show="!isLoadingDetailProduct" v-if="product">
      <div class="flex justify-center">
        <div class="w-full max-w-4xl">
          <ProductDetail :product="product" />
        </div>
      </div>
      <h2
        v-show="_similarProducts.length > 0"
        class="text-2xl m-4 w-full text-center"
      >Lignende varer</h2>
      <div>
        <div v-show="isLoadingSimilarProducts" class="flex align-center justify-center mt-4">
          <v-progress-circular :size="40" :width="7" color="purple" indeterminate></v-progress-circular>
        </div>
        <ProductList
          v-show="!isLoadingSimilarProducts && _similarProducts"
          :products="_similarProducts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import { getStandardProduct } from "@/util/products/convert";
import { getAllMetaInfoForProduct } from "@/util/meta-tags";

export default {
  name: "OfferDetail",
  components: {
    ProductList,
    ProductDetail,
  },
  metaInfo() {
    if (this.product) {
      const metaInfo = getAllMetaInfoForProduct(this.product);
      return { ...metaInfo, titleTemplate: "%s - allematpriser.no" };
    }
  },
  computed: {
    ...mapState([
      "detailProduct",
      "similarProducts",
      "isLoadingSimilarProducts",
      "isLoadingDetailProduct",
      "detailProductNotFound",
    ]),
    _similarProducts() {
      return this.similarProducts
        .filter((offer) => offer.uri !== this.offerId)
        .map(getStandardProduct);
    },
    product() {
      if (this.detailProduct) {
        return getStandardProduct(this.detailProduct);
      }
      return null;
    },
    offerId() {
      return this.$route.params.id;
    },
  },
  methods: {
    handleClickMenu: function() {
      this.$router.go(-1);
    },
  },
  watch: {
    detailProduct(newValue) {
      if (newValue) {
        this.$store.dispatch("LOAD_SIMILAR_PRODUCTS", {
          product: newValue,
        });
      }
    },
    offerId(newValue) {
      this.$store.dispatch("LOAD_DETAIL_PRODUCT", { id: newValue });
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.$store.dispatch("LOAD_DETAIL_PRODUCT", { id: this.offerId });
    window.scrollTo(0, 0);
  },
};
</script>

<style></style>
