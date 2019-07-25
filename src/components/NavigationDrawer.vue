<template>
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
          >© {{now.getUTCFullYear()}} allematpriser.no</v-list-tile-content>
        </v-list-tile>
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
