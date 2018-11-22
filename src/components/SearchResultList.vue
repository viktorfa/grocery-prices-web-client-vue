<template>
  <div>
    <div
      class="result-list"
    >
    <SearchResultItem
      v-for="result in _results"
      v-bind:key="result.id"
      v-bind:title="result.title"
      v-bind:price="result.price"
      v-bind:subtitle="result.subtitle"
      v-bind:image_url="result.image_url"
      v-bind:href="result.href"
    />
    </div>
    <button
      @click="showMore"
      v-if="isMore"
      class="load-more-button"
    >
    mer
    </button>
  </div>
</template>

<script>
import _ from "lodash";
import SearchResultItem from "./SearchResultItem";
import { getStandardProduct } from "../lib";

export default {
  name: "SearchResultList",
  components: {
    SearchResultItem
  },
  props: {
    results: Array
  },
  data: function() {
    return {
      limit: 10
    };
  },
  computed: {
    isMore: function() {
      return this.results.length > this.limit;
    },
    _results: function() {
      return _.take(this.results.map(getStandardProduct), this.limit);
    }
  },
  methods: {
    showMore: function() {
      this.limit += 10;
    }
  }
};
</script>

<style>
.result-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
}
.load-more-button {
  border: blue solid 1px;
  border-radius: 4px;
  color: blue;
  background-color: transparent;
  font-size: 1.6rem;
  padding: 0.4rem 1.2rem;
}
</style>