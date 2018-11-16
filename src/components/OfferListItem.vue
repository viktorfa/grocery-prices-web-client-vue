<template>
<!--
  <div>
    <p>
      {{offer.branding.name}} {{offer.heading}} – <strong>{{offer.pricing.price}}</strong>
    </p>
    <img
      v-if="offer.images"
      v-bind:src="offer.images.thumb"
      v-bind:alt="offer.heading"
    />
  </div>
  -->
  <SearchResultItem
  v-bind:price="offer.pricing.price"
  v-bind:image_url="offer.images.view"
  v-bind:title="offer.heading"
  v-bind:subtitle="offer.branding.name"
/>
</template>


<script>
import SearchResultItem from "./SearchResultItem";

export default {
  name: "OfferListItem",
  components: {
    SearchResultItem
  },
  props: {
    offer: Object
  }
};
</script>
