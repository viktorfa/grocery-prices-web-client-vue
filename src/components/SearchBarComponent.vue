<template>
  <v-combobox
    ref="searchInput"
    @focus="handleFocus"
    v-model="queryInput"
    :search-input.sync="searchInput"
    label="Søk i 3 nettbutikker og alle tilbud"
    type="search"
    solo
    clearable
    prepend-inner-icon="menu"
    @click:prepend-inner="handleClickMenu"
    :loading="isSearching === true"
    class="search-input"
    :items="autocomplete"
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

export default {
  name: "SearchBarComponent",
  props: {
    handleClickMenu: { type: Function, required: true },
  },
  data() {
    return {
      /**
       * The actual selected query term that should execute a search query on change.
       * Should be global through router.
       */
      queryInput: this.$route.params.query || this.$store.state.searchQuery,
      /** The input to the combobox that should only determine hints for autocomplete. Should be local state. */
      searchInput: "",
    };
  },
  computed: {
    ...mapState(["isSearching", "showDrawer", "searchResults"]),
    autocomplete() {
      return getHints(this.searchInput);
    },
  },
  watch: {
    /** Focus input if search result is empty. */
    searchResults(newValue) {
      if (newValue.length === 0) {
        this.$refs.searchInput.focus();
      }
    },
    /** Communicates the current query with the router. */
    queryInput(newValue, oldValue) {
      console.info(`queryInput change to ${newValue} from ${oldValue}`);
      if (newValue && newValue.length > 0) {
        this.$router.replace(`/sok/${newValue}`);
      }
      this.$nextTick(() => {
        this.$refs.searchInput.blur();
      });
    },
    /** Dropdown in search box should go away when opening side menu. */
    showDrawer(newValue) {
      if (newValue === true) {
        this.$refs.searchInput.blur();
      }
    },
  },
  methods: {
    handleFocus() {
      if (!this.$route.path.startsWith("/sok/")) {
        this.$router.push("/sok/");
      }
    },
  },
};
</script>

<style>
.v-autocomplete__content {
  top: 56px !important; /* Autocomplete for type-ahead covers all screen on mobile so we push it down */
}
.v-input__append-inner:last-child {
  /* Remove the dropdown icon on search bar */
  display: none;
}
</style>
