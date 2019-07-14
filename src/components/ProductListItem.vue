<template>
  <v-layout class="result-list-item" column>
    <router-link :to="`/tilbud/${id}`" class="search-result-link flex flex-col justify-between">
      <div v-lazyload>
        <img
          v-if="showDealerLogo && dealerLogoSrc"
          class="dealer-logo-image"
          :data-url="dealerLogoSrc"
          :alt="dealer"
        />
        <p v-else-if="showDealerLogo" class="font-semibold">{{dealer}}</p>
        <h3 class="text-xl font-semibold">{{ title }}</h3>
        <p v-if="showSubtitle">{{ subtitle }}</p>
        <p v-if="formattedPrice">
          <strong>{{ formattedPrice }}</strong>
        </p>
      </div>
      <div v-lazyload>
        <img class="result-list-item-image" :data-url="image_url" :alt="title" />
      </div>
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
  max-height: 32px;
  max-width: 160px;
}
.result-list-item {
  width: calc(50vw - 0.6rem);
  margin: 0.5rem 0.3rem;
  border-width: 0;
  border-style: solid;
  border-bottom-width: 2px;
  height: 420px;
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
