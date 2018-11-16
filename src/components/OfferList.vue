<template>
<div>
    <div
      v-if="offers.length > 0"
      v-for="offer in offers"
      v-bind:key="offer.id"
      v-bind:offer="offer"
    >
    <OfferListItem
      v-bind:offer="offer"
    />
    </div>
</div>
</template>


<script>
import OfferListItem from "./OfferListItem";
export default {
  name: "OfferList",
  components: {
    OfferListItem
  },
  props: {
    offers: Array
  }
};
</script>