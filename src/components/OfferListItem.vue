<template>
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
</template>


<script>
export default {
  name: "OfferListItem",
  props: {
    offer: Object
  }
};
</script>
