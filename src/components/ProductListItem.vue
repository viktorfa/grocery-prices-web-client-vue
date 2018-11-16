<template>
<!--
<div
  class="list-item"
>
  <p>
    {{product.title}} – <strong>{{product.price}}</strong>
  </p>
  <img
    v-if="product.image_url"
    v-bind:src="product.image_url"
    v-bind:alt="product.title"
  />
</div>
-->
<SearchResultItem
  v-bind:price="product.price"
  v-bind:image_url="product.image_url"
  v-bind:title="product.title"
  v-bind:subtitle="product.brand"
/>
</template>


<script>
import SearchResultItem from "./SearchResultItem";

export default {
  name: "ProductListItem",
  components: {
    SearchResultItem
  },
  props: {
    product: Object
  }
};
</script>


