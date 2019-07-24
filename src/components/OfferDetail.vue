<template>
  <div>
    <v-toolbar color="indigo" dark fixed app>
      <v-btn icon @click.stop="handleClickMenu">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title v-if="product">{{ product.title }}</v-toolbar-title>
    </v-toolbar>
    <div v-show="isLoadingDetailProduct" class="flex align-center justify-center vh50 my-flex">
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
    </div>
    <v-layout row wrap class="text-xs-center" v-show="!isLoadingDetailProduct" v-if="product">
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12 class="flex justify-center">
            <v-card flat class="w-full">
              <v-img :src="product.image_url" aspect-ratio="2.4" contain :alt="product.title"></v-img>
              <v-card-title primary-title>
                <v-flex class="flex flex-col">
                  <h3 class="headline mb-0">{{ formatPrice(product.price) }}</h3>
                  <div>{{ product.description }}</div>
                  <div>{{ product.value }}</div>
                  <v-img
                    v-if="dealerLogoSrc"
                    class="dealer-logo-image"
                    :src="dealerLogoSrc"
                    :alt="product.dealer"
                    contain
                    width="160"
                    max-height="32"
                  />
                  <div v-else>{{ product.dealer }}</div>
                </v-flex>
              </v-card-title>
              <v-card-actions>
                <v-btn outline flat color="orange" :href="product.href" target="_blank">Se annonse</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <h2
        v-show="_similarProducts.length > 0"
        class="text-2xl m-4 w-full text-center"
      >Lignende varer</h2>
      <v-flex xs12>
        <div
          v-show="isLoadingSimilarProducts"
          class="flex align-center justify-center vh50 my-flex"
        >
          <v-progress-circular :size="40" :width="7" color="purple" indeterminate></v-progress-circular>
        </div>
        <ProductList
          v-show="!isLoadingSimilarProducts && _similarProducts"
          :products="_similarProducts"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ProductList from "./ProductList";
import { getStandardProduct, formatPrice, setPageTitle } from "../lib";
import { getDealerLogoSrc } from "@/helpers";

export default {
  name: "OfferDetail",
  components: {
    ProductList,
  },
  computed: {
    ...mapState([
      "detailProduct",
      "similarProducts",
      "isLoadingSimilarProducts",
      "isLoadingDetailProduct",
    ]),
    _similarProducts() {
      return this.similarProducts
        .filter((offer) => offer.uri !== this.offerId)
        .map(getStandardProduct);
    },
    dealerLogoSrc() {
      return this.product ? getDealerLogoSrc(this.product.dealer) : "";
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
      const query = this.queryString;
      if (query) {
        this.$router.push({ name: "search", params: { query } });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    formatPrice,
  },
  watch: {
    detailProduct(newValue) {
      if (newValue) {
        this.$store.dispatch("LOAD_SIMILAR_PRODUCTS", {
          product: newValue,
        });
        setPageTitle(`${newValue.heading}`);
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
