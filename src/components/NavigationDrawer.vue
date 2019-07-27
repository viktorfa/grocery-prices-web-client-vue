<template>
  <v-navigation-drawer v-model="showDrawer" fixed clipped class="grey lighten-4" app>
    <v-list dense class="grey lighten-4">
      <v-list-item>
        <v-list-item-avatar>
          <img src="/logo-256x256.png" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <router-link to="/">allematpriser.no</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-action>
          <v-icon>settings</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="grey--text">Instillinger</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="https://crowdsource.allematpriser.no">
        <v-list-item-action>
          <v-icon>add</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="grey--text text--darken-4">Legg til tilbud</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div>
      <v-list dense>
        <v-list-item>
          <v-list-item-content :style="{'align-items': 'center'}">{{commitSha.substring(0, 8)}}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content
            :style="{'align-items': 'center'}"
          >© {{now.getUTCFullYear()}} allematpriser.no</v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { commitSha } from "@/config/vars";

export default {
  name: "NavigationDrawer",
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
};
</script>

<style>
</style>
