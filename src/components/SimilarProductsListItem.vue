<template>
  <div
    class="result-list-item"
  >
<router-link
  :to="`/tilbud/${id}`"
  class="search-result-link"
>
    <h3>{{title}}</h3>
    <p>{{description}}</p>
    <p
      v-if="formattedPrice"
    >
      <strong>{{formattedPrice}}</strong>
    </p>
    <img
      class="result-list-item-image"
      v-bind:src="image_url"
      v-bind:alt="title"
    />
    <p>{{dealer}}</p>
    <p>{{value}}</p>
</router-link>
  </div>
</template>


<script>
import { formatPrice } from "../lib";
export default {
  name: "SimilarProductsListItem",
  props: {
    price: [Number, String],
    title: String,
    value: String,
    description: String,
    dealer: String,
    image_url: String,
    href: String,
    id: String,
  },
  data: function() {
    return {
      formattedPrice: formatPrice(this.price)
    };
  }
};
</script>
