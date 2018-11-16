<template>
<div>
  <p>
    {{product.title}} – <strong>{{product.price}}</strong>
  </p>
  <img
    v-if="product.image_url"
    v-bind:src="product.image_url"
    v-bind:alt="product.title"
  />
</div>
</template>


<script>
export default {
  name: "ProductListItem",
  props: {
    product: Object
  }
};
</script>
