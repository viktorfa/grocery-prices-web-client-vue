<template>
  <div>
    <v-layout row wrap justify-space-around align-end>
      <template v-for="product in _products">
        <ProductListItem
          :key="product.id"
          v-bind="product"
          :showDealerLogo="showDealerLogo"
          :showSubtitle="showSubtitle"
        />
      </template>
    </v-layout>
    <v-btn @click="showMore" v-if="isMore" color="info" block flat>mer</v-btn>
    <br v-else />
  </div>
</template>

<script>
import _ from "lodash";
import ProductListItem from "./ProductListItem";

export default {
  name: "ProductList",
  components: { ProductListItem },
  props: {
    products: Array,
    showSubtitle: { type: Boolean, default: true },
    showDealerLogo: { type: Boolean, default: true },
  },
  data: function() {
    return {
      limit: 10,
    };
  },
  computed: {
    isMore() {
      return this.products.length > this.limit;
    },
    _products() {
      return _.take(this.products, this.limit);
    },
  },
  methods: {
    showMore: function() {
      this.limit += 10;
    },
  },
};
</script>
