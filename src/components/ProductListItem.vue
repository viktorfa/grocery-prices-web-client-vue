<template>
  <v-layout class="result-list-item" column>
    <router-link :to="`/tilbud/${id}`" class="search-result-link">
      <div>
        <v-img
          v-if="showDealerLogo && dealerLogoSrc"
          class="dealer-logo-image"
          :src="dealerLogoSrc"
          :alt="subtitle"
          contain
          max-width="160"
          max-height="32"
        />
        <p v-else-if="showDealerLogo" class="font-semibold">{{dealer}}</p>
        <h3 class="text-xl font-semibold">{{ title }}</h3>
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
    </router-link>
  </v-layout>
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
.result-list-item {
  width: calc(50vw - 0.6rem);
  margin: 0.5rem 0.3rem;
  border-width: 0;
  border-style: solid;
  border-bottom-width: 2px;
  height: 100%;
  display: flex;
  flex-grow: initial;
}
.result-list-item-image {
  width: calc(50vw - 0.6rem);
  height: calc((50vw - 0.6rem) * 1.4);
  object-fit: contain;
  object-position: center;
}

@media only screen and (min-width: 481px) {
  .result-list-item {
    width: 160px;
    margin: 0.5rem;
  }
  .result-list-item-image {
    width: 160px;
    height: 240px;
  }
}

.search-result-link {
  color: inherit;
  text-decoration: none;
}
</style>
