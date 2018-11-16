<template>
<div>
  <p>
    {{result.title}} – <strong>{{result.price}}</strong>
  </p>
  <img
    v-if="result.image_url"
    v-bind:src="result.image_url"
    v-bind:alt="result.title"
  />
</div>
</template>


<script>
export default {
  name: "SearchResultItem",
  props: {
    result: Object
  },
  data: function() {
    return {
      showBrand: false
    };
  },
  methods: {
    clickItem: function(event) {
      this.showBrand = true;
    }
  }
};
</script>
