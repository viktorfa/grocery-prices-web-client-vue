<template>
  <ShareDialog :socialLinkData="socialLinkData" :title="product.title" :url="url">
    <template v-slot:activator>
      <v-btn outline flat color="orange">Del</v-btn>
    </template>
  </ShareDialog>
</template>

<script>
import ShareDialog from "./ShareDialog";
import { getSocialLinkDataForProduct } from "../sharing";
import { getAmpShareUrlForProduct } from "../helpers";
export default {
  name: "ProductShareDialog",
  components: {
    ShareDialog,
  },
  props: {
    product: { type: Object, required: true },
  },
  data() {
    return {
      socialLinkData: getSocialLinkDataForProduct(this.product),
      url: getAmpShareUrlForProduct(this.product),
    };
  },
};
</script>

<style>
</style>
