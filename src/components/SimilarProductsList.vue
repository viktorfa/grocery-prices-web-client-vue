<template>
  <ProductList :products="this._products">
    <SimilarProductsListItem
      slot-scope="{product}"
      :title="product.title"
      :description="product.description"
      :dealer="product.dealer"
      :price="product.price"
      :image_url="product.image_url"
      :href="product.href"
      :id="product.id"
    />
  </ProductList>
</template>

<script>
import _ from "lodash";
import SimilarProductsListItem from "./SimilarProductsListItem";
import ProductList from "./ProductList";
import { getStandardProduct } from "../lib";

export default {
  name: "SimilarProductsList",
  components: {
    ProductList,
    SimilarProductsListItem
  },
  props: {
    products: Array
  },
  computed: {
    _products: function() {
      return this.products.map(getStandardProduct);
    }
  }
};
</script>
