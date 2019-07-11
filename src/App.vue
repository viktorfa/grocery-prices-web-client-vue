<template>
  <v-app class="app">
    <v-navigation-drawer v-model="showDrawer" fixed clipped class="grey lighten-4" app>
      <v-list dense class="grey lighten-4">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="/logo-256x256.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/">allematpriser.no</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">Instillinger</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile href="https://crowdsource.allematpriser.no">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text text--darken-4">Legg til tilbud</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <div>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content :style="{'align-items': 'center'}">{{commitSha.substring(0, 8)}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content
              :style="{'align-items': 'center'}"
            >© allematpriser.no {{now.getUTCFullYear()}}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";

import { commitSha } from "@/config/vars";

export default Vue.component("app", {
  data() {
    return {
      now: new Date(),
      commitSha,
    };
  },
  computed: {
    showDrawer: {
      get() {
        return this.$store.state.showDrawer;
      },
      set(newValue) {
        return this.$store.commit("setShowDrawer", newValue);
      },
    },
  },
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

.v-navigation-drawer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.center-box {
  margin: auto;
  width: 100%;
  height: 100%;
  text-align: center;
}

.vh50 {
  height: 50vh;
}

.my-flex {
  display: flex;
}
</style>
