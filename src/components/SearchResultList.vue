<template>
  <ProductList :products="this._results">
    <SearchResultItem
      slot-scope="{ product }"
      :title="product.title"
      :subtitle="product.subtitle"
      :price="product.price"
      :image_url="product.image_url"
      :id="product.id"
      :value="product.value"
    />
  </ProductList>
</template>

<script>
import SearchResultItem from './SearchResultItem';
import ProductList from './ProductList';
import { getStandardProduct } from '../lib';

export default {
  name: 'SearchResultList',
  components: {
    ProductList,
    SearchResultItem,
  },
  props: {
    results: Array,
  },
  computed: {
    _results: function() {
      return this.results.map(getStandardProduct);
    },
  },
};
</script>
