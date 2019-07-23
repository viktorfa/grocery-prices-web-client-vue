<template>
  <v-combobox
    ref="searchInput"
    v-model="queryInput"
    :search-input.sync="searchInput"
    label="Søk i 3 nettbutikker og alle tilbud"
    type="search"
    autofocus
    solo
    clearable
    prepend-inner-icon="menu"
    @click:prepend-inner="handleClickMenu"
    :loading="isSearching === true"
    class="search-input"
    :items="autocomplete"
    @change="handleAutocompleteChange"
    :menu-props="{
        closeOnClick: false,
        closeOnContentClick: false,
        openOnClick: false,
      }"
  />
</template>

<script>
import { mapState } from "vuex";

import { getHints } from "@/autocomplete";
import { setQueryStringInPage } from "../lib";

export default {
  name: "SearchBarComponent",
  props: {
    handleClickMenu: { type: Function, required: true },
  },
  data() {
    return {
      queryInput: this.$route.params.query || this.$store.state.searchQuery,
      searchInput: "",
      autocomplete: getHints(),
    };
  },
  computed: {
    ...mapState(["isSearching"]),
  },
  watch: {
    queryInput: function(newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        this.$store.commit("setQueryString", newValue);
        this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
          queryString: newValue,
        });
      } else if (!newValue || (newValue && newValue.length === 0)) {
        this.$store.commit("setShowPromotedProducts", true);
        this.$store.commit("setQueryString", "");
        setQueryStringInPage("");
      }
    },
    searchInput(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.autocomplete = getHints(newValue);
      }
    },
  },
  methods: {
    handleAutocompleteChange(newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        this.queryInput = newValue;
        // when selecting from the autoselect, it will go back to the old query on blur, so we must wait for next tick
        this.$nextTick(() => {
          this.$refs.searchInput.blur();
        });
      }
    },
  },
  mounted() {
    if (this.queryInput && this.queryInput.length > 0) {
      this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
        queryString: this.queryInput,
      });
    }
  },
};
</script>

<style>
</style>
