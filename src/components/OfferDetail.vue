<template>
  <div>
    <v-toolbar color="indigo" dark fixed app>
      <v-btn icon @click.stop="handleClickMenu">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>{{product.title}}</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap class="text-xs-center">
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card flat>
              <v-img :src="product.image_url" aspect-ratio="2.0" contain :alt="product.title"></v-img>
              <v-card-title primary-title>
                <v-flex>
                  <h3 class="headline mb-0">{{formatPrice(product.price)}}</h3>
                  <div>{{product.description}}</div>
                  <div>{{product.dealer}}</div>
                  <div>{{product.value}}</div>
                </v-flex>
              </v-card-title>
              <v-card-actions>
                <v-btn outline flat color="orange" :href="product.href" target="_blank">Se annonse</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 v-if="similarProducts.length > 0">
        <h2>Lignende varer</h2>
      </v-flex>
      <v-flex xs12>
        <SimilarProductsList :products="similarProducts"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { getStandardProduct, formatPrice } from "../lib";
import SimilarProductsList from "./SimilarProductsList";

export default {
  name: "OfferDetail",
  components: {
    SimilarProductsList
  },
  data() {
    return {
      offerId: this.$route.params.id
    };
  },
  computed: {
    ...mapState(["detailProduct", "searchResults", "queryString"]),
    product: {
      get() {
        return getStandardProduct(this.detailProduct);
      },
      set() {}
    },
    similarProducts() {
      return this.searchResults.filter(offer => offer.id !== this.offerId);
    }
  },
  methods: {
    handleClickMenu: function() {
      const query = this.queryString || this.product.title;
      if (query) {
        this.$router.push({ name: "search", params: { query } });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    formatPrice
  },
  watch: {
    detailProduct(newValue) {
      this.product = getStandardProduct(newValue);
      this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
        queryString: this.product.title,
        setUrl: false
      });
    },
    $route(to) {
      this.offerId = to.params.id;
    },
    offerId(newValue) {
      this.$store.dispatch("LOAD_DETAIL_PRODUCT", { id: newValue });
    }
  },
  created() {
    this.$store.dispatch("LOAD_DETAIL_PRODUCT", { id: this.offerId });
  }
};
</script>

<style>
</style>
