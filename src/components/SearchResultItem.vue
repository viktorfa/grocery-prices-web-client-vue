<template>
<v-card
  width="200"
>
  <v-img
    v-bind:src="image_url"
    v-bind:alt="title"
  >
  <div
    class="card-price-headline-container"
    v-if="price"
  >
    <p
      class="headline white--text card-price-headline"
    >
      {{price}},-
    </p>
  </div>
  
  </v-img>
  <v-card-title primary-title class="card-title">
    <h2>{{title}}</h2>
  </v-card-title>
  <v-card-title>
    <p>{{subtitle}}</p>
  </v-card-title>
</v-card>
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
.list-item {
  width: 200px;
}
.card-price-headline {
  background-color: rgba(20, 20, 20, 0.5);
  width: 100%;
  margin: 0;
}
.card-price-headline-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
}
.card-title {
  text-align: center;
}
</style>