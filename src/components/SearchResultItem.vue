<template>
  <div
    class="result-list-item"
  >
    <h3>{{title}}</h3>
    <p>{{subtitle}}</p>
    <p
      v-if="price"
    >
      <strong>{{price}},-</strong>
    </p>
    <img
      class="result-list-item-image"
      v-bind:src="image_url"
      v-bind:alt="title"
    />
  </div>
</template>


<script>
export default {
  name: "SearchResultItem",
  props: {
    price: Number,
    title: String,
    subtitle: String,
    image_url: String
  }
};
</script>

<style>
  .result-list-item {
    width: 200px;
    border: 0px rgba(200, 200, 200, 0.8) solid;
    border-bottom-width: 1px;
    border-left-width: 1px;
  }
  .result-list-item-image {
    object-fit: contain;
    object-position: center;
    max-width: 200px;
  }
</style>