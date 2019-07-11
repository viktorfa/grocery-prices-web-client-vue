<template>
  <router-link :to="`/tilbud/${id}`" class="search-result-link">
    <v-layout class="result-list-item" column>
      <div>
        <v-img
          v-if="dealerLogoSrc"
          class="dealer-logo-image"
          :src="dealerLogoSrc"
          :alt="subtitle"
          contain
          max-width="160"
          max-height="32"
        />
        <h3>{{ title }}</h3>
        <p v-if="showSubtitle">{{ subtitle }}</p>
        <p v-if="formattedPrice">
          <strong>{{ formattedPrice }}</strong>
        </p>
      </div>
      <v-layout column justify-center>
        <v-img class="result-list-item-image" contain v-bind:src="image_url" v-bind:alt="title" />
      </v-layout>
      <div>
        <p>{{ value }}</p>
      </div>
    </v-layout>
  </router-link>
</template>

<script>
import { formatPrice } from "@/lib";
import { getDealerLogoSrc } from "@/helpers";
export default {
  name: "ProductListItem",
  props: {
    price: { type: [Number, String], required: true },
    title: { type: String, required: true },
    subtitle: String,
    image_url: String,
    href: String,
    value: String,
    id: { type: String, required: true },
    dealer: String,
    description: String,
    showDealerLogo: { type: Boolean, default: true },
    showSubtitle: { type: Boolean, default: true },
  },
  computed: {
    dealerLogoSrc() {
      if (this.showDealerLogo) {
        return getDealerLogoSrc(this.dealer);
      }
      return "";
    },
  },
  data: function() {
    return {
      formattedPrice: formatPrice(this.price),
    };
  },
};
</script>

<style>
.dealer-logo-image {
  margin: auto;
}
</style>
