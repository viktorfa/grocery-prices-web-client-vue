<template>
  <router-link :to="`/tilbud/${id}`" class="search-result-link">
    <v-layout class="result-list-item" column>
      <div>
        <h3>{{title}}</h3>
        <p>{{subtitle}}</p>
        <p v-if="formattedPrice">
          <strong>{{formattedPrice}}</strong>
        </p>
      </div>
      <v-layout column justify-center>
        <v-img class="result-list-item-image" contain v-bind:src="image_url" v-bind:alt="title"/>
      </v-layout>
      <div>
        <p>{{value}}</p>
      </div>
    </v-layout>
  </router-link>
</template>


<script>
import { formatPrice } from "@/lib";
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
