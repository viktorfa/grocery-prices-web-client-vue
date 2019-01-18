<template>
  <div>
    <div class="result-list">
      <div v-for="product in _products" :key="product.id">
        <slot :product="product"></slot>
      </div>
    </div>
    <v-btn @click="showMore" v-if="isMore" color="info" block flat>mer</v-btn>
    <br v-else/>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "ProductList",
  props: {
    products: Array
  },
  data: function() {
    return {
      limit: 10
    };
  },
  computed: {
    isMore() {
      return this.products.length > this.limit;
    },
    _products() {
      return _.take(this.products, this.limit);
    }
  },
  methods: {
    showMore: function() {
      this.limit += 10;
    }
  }
};
</script>
