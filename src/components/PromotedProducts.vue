<template>
  <ProductList :products="this._products">
    <SearchResultItem
      slot-scope="{ product }"
      :title="product.title"
      :subtitle="product.subtitle"
      :dealer="product.dealer"
      :price="product.price"
      :image_url="product.image_url"
      :href="product.href"
      :id="product.id"
    />
  </ProductList>
</template>

<script>
import SearchResultItem from './SearchResultItem';
import ProductList from './ProductList';
import { getStandardProduct } from '../lib';

export default {
  name: 'PromotedProducts',
  components: {
    ProductList,
    SearchResultItem,
  },
  props: {
    products: Array,
  },
  computed: {
    _products: function() {
      return this.products.map(getStandardProduct).filter(
        // unique by id
        ({ id }, index, arr) =>
          !arr.slice(index + 1).find(({ id: _id }) => id === _id)
      );
    },
  },
};
</script>
