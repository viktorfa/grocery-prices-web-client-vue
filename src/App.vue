<template>
  <v-app class="v-application">
    <v-content>
      <NavigationDrawer />
      <SearchBarComponent>
        <template v-slot:prepend-inner>
          <TopMenuButton />
        </template>
      </SearchBarComponent>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";

import NavigationDrawer from "./components/NavigationDrawer";
import SearchBarComponent from "./components/SearchBarComponent";
import TopMenuButton from "./components/TopMenuButton";

export default Vue.component("app", {
  components: {
    NavigationDrawer,
    SearchBarComponent,
    TopMenuButton,
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
