<template>
  <div>
    <v-layout row wrap justify-space-around>
      <div v-for="product in _products" :key="product.id">
        <slot v-if="hasSlot" :product="product" v-bind="$props"></slot>
        <ProductListItem
          v-else
          v-bind="product"
          :showDealerLogo="showDealerLogo"
          :showSubtitle="showSubtitle"
        />
      </div>
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
    hasSlot() {
      return !!this.$slots.default;
    },
  },
  methods: {
    showMore: function() {
      this.limit += 10;
    },
  },
};
</script>
