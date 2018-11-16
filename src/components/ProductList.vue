<template>
<div
    v-if="products.length > 0"
>
    <div
      v-for="product in products"
      v-bind:key="product.product_url"
      v-bind:product="product"
    >
      <ProductListItem
        v-bind:product="product"
      />
    </div>
</div>
</template>


<script>
import ProductListItem from "./ProductListItem";
export default {
  name: "ProductList",
  components: {
    ProductListItem
  },
  props: {
    products: Array
  }
};
</script>