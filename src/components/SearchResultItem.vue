<template>
  <div class="result-list-item">
    <router-link :to="`/tilbud/${id}`" class="search-result-link">
      <h3>{{title}}</h3>
      <p>{{subtitle}}</p>
      <p v-if="formattedPrice">
        <strong>{{formattedPrice}}</strong>
      </p>
      <v-img class="result-list-item-image" v-bind:src="image_url" v-bind:alt="title"/>
      <p>{{value}}</p>
    </router-link>
  </div>
</template>


<script>
import { formatPrice } from "../lib";
export default {
  name: "SearchResultItem",
  props: {
    price: [Number, String],
    title: String,
    subtitle: String,
    image_url: String,
    href: String,
    value: String,
    id: String
  },
  data: function() {
    return {
      formattedPrice: formatPrice(this.price)
    };
  }
};
</script>

<style>
@media only screen and (max-width: 480px) {
  .result-list-item {
    width: calc(50% - 0.6rem);
  }
  .result-list-item-image {
    width: calc(50vw - 0.6rem);
  }
}
@media only screen and (min-width: 481px) {
  .result-list-item {
    width: 200px;
  }
}
.result-list-item {
  border-width: 0;
  border-style: solid;
  border-bottom-width: 2px;
}
.result-list-item-image {
  object-fit: contain;
  object-position: center;
  max-width: 200px;
}
</style>

<style scoped>
.search-result-link {
  color: inherit;
  text-decoration: none;
}
</style>