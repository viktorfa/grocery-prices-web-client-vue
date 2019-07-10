<template>
  <router-link :to="`/tilbud/${id}`" class="search-result-link">
    <v-layout class="result-list-item" column>
      <div>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <v-img
          v-if="dealerLogoSrc"
          class="dealer-logo-image"
          :src="dealerLogoSrc"
          :alt="dealer"
          contain
          max-width="160"
          max-height="32"
        />
        <div v-else>{{ dealer }}</div>
        <p v-if="formattedPrice">
          <strong>{{ formattedPrice }}</strong>
        </p>
      </div>
      <v-layout column justify-center>
        <v-img
          class="result-list-item-image"
          contain
          v-bind:src="image_url"
          v-bind:alt="title"
        />
      </v-layout>
      <div>
        <p>{{ dealer }}</p>
        <p>{{ value }}</p>
      </div>
    </v-layout>
  </router-link>
</template>

<script>
import { formatPrice } from "@/lib";
import { getDealerLogoSrc } from "@/helpers";

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
      formattedPrice: formatPrice(this.price),
    };
  },
  computed: {
    dealerLogoSrc() {
      return getDealerLogoSrc(this.dealer);
    },
  },
};
</script>
