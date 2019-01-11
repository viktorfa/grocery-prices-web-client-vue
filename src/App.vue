<template>
  <v-app class="app">
    <v-navigation-drawer v-model="drawer" fixed clipped class="grey lighten-4" app>
      <v-list dense class="grey lighten-4">
        <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="/logo-256x256.png">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>matpriser.no</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
          <v-list-tile v-else :key="i" @click>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <div>
        <v-form v-on:submit="executeQuery">
          <v-text-field
            ref="searchInput"
            v-model="queryInput"
            label="Søk"
            type="search"
            autofocus
            solo
            clearable
            prepend-inner-icon="menu"
            @click:prepend-inner="handleClickMenu"
            loading="isSearching"
            class="search-input"
          ></v-text-field>
        </v-form>
        <p v-if="isSearching === true">
          søker etter
          <strong>{{queryInput}}</strong> ...
        </p>
        <SearchResults v-if="searchResults.length > 0" v-bind:results="searchResults"/>
        <div v-if="showPromotedProducts" class="text-xs-center offer-search-results">
          <h1 class="offer-search-results-header">Utvalgte tilbud</h1>
          <SearchResultList v-bind:results="promotedProducts"/>
        </div>
        <h2
          v-if="searchResults.length === 0 && queryInput && isSearching !== true"
        >Ingen treff på "{{queryInput}}"</h2>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
import lunr from "lunr";
import { mapState } from "vuex";
import { setQueryStringInPage } from "./lib";

import SearchResults from "./components/SearchResults.vue";
import SearchResultList from "./components/SearchResultList.vue";

export default Vue.component("app", {
  components: {
    SearchResults,
    SearchResultList
  },
  data() {
    return {
      queryInput: this.$store.state.queryString,
      items: [
        { icon: "settings", text: "Instillinger" },
        { icon: "add", text: "Legg til tilbud" },
      ],
      drawer: null
    };
  },
  computed: {
    ...mapState([
      "promotedProducts",
      "showPromotedProducts",
      "searchResults",
      "isSearching",
      "isLoadingProducts"
    ])
  },
  watch: {
    queryInput: function(newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        this.$store.commit("setQueryString", newValue);
      } else if (!newValue || (newValue && newValue.length === 0)) {
        setQueryStringInPage("");
      }
    }
  },
  methods: {
    executeQuery: async function(event) {
      event.preventDefault();
      if (this.queryInput && this.queryInput.length > 0) {
        this.$refs.searchInput.blur();
        this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
          queryString: this.queryInput
        });
      }
    },
    handleClickMenu: function(event) {
      console.log("menuClick");
      this.drawer = !this.drawer;
      this.$refs.searchInput.blur();
    }
  }
});
</script>


<style>
:root {
  --kolonial-color: #f19500;
  --offer-color: rgb(189, 27, 189);
  --meny-color: #ce0029;
  --europris-color: #393;
  --max-width: 1024px;
  --background-color: #fafafa;
}

body {
  background-color: var(--background-color);
}

.app {
  margin: auto;
  max-width: var(--max-width);
}
.result-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
}

.offer-search-results-header {
  background-color: var(--offer-color);
  color: white;
}
.offer-search-results .result-list-item {
  border-color: var(--offer-color);
}
.kolonial-search-results-header {
  background-color: var(--kolonial-color);
  color: white;
}
.kolonial-search-results .result-list-item {
  border-color: var(--kolonial-color);
}
.meny-search-results-header {
  background-color: var(--meny-color);
  color: white;
}
.meny-search-results .result-list-item {
  border-color: var(--meny-color);
}
.europris-search-results-header {
  background-color: var(--europris-color);
  color: white;
}
.europris-search-results .result-list-item {
  border-color: var(--europris-color);
}

.search-input {
  margin: 0.3em 0.3em 0 0.3em !important;
  background-color: var(--background-color) !important;
}
.v-input__slot {
  border-radius: 12px !important;
}
</style>
