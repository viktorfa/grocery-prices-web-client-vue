<template>
  <v-app class="v-application">
    <v-content class="container mx-auto">
      <NavigationDrawer />
      <SearchBarComponent>
        <template v-slot:prepend-inner>
          <TopMenuButton />
        </template>
      </SearchBarComponent>
      <div class="mx-1 sm:mx-0">
        <router-view></router-view>
      </div>
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
  --offer-color: #bd1bbd;
  --meny-color: #ce0029;
  --europris-color: #393;
  --max-width: 1024px;
  --background-color: #fafafa;
}

.offer-search-results .result-list-item {
  border-color: var(--offer-color);
}
.kolonial-search-results .result-list-item {
  border-color: var(--kolonial-color);
}
.meny-search-results .result-list-item {
  border-color: var(--meny-color);
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
