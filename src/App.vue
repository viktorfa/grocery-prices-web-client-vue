<template>
  <v-app class="app">
    <v-navigation-drawer v-model="showDrawer" fixed clipped class="grey lighten-4" app>
      <v-list dense class="grey lighten-4">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="/logo-256x256.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/">allematpriser.no</router-link>
            </v-list-tile-title>
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
          <v-list-tile v-else :key="i">
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
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";

export default Vue.component("app", {
  data() {
    return {
      items: [
        { icon: "settings", text: "Instillinger" },
        { icon: "add", text: "Legg til tilbud" }
      ]
    };
  },
  computed: {
    showDrawer: {
      get() {
        return this.$store.state.showDrawer;
      },
      set(newValue) {
        return this.$store.commit("setShowDrawer", newValue);
      }
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

@media only screen and (max-width: 480px) {
  .result-list-item {
    width: calc(50vw - 0.6rem);
    margin: 0.5rem 0.3rem;
  }
  .result-list-item-image {
    width: calc(50vw - 0.6rem);
  }
}
@media only screen and (min-width: 481px) {
  .result-list-item {
    width: 200px;
  }
  .result-list-item-image {
    width: 200px;
  }
}
.result-list-item {
  border-width: 0;
  border-style: solid;
  border-bottom-width: 2px;
  margin: 0.3rem;
  height: 100%;
  display: flex;
}
.result-list-item-image {
  object-fit: contain;
  object-position: center;
}

.search-result-link {
  color: inherit;
  text-decoration: none;
}
</style>
