import Vue from "vue";
import "./plugins/vuetify";

import store from "./store";
import router from "./router";
import App from "./App.vue";
import "./main.css";
Vue.config.productionTip = false;

store.dispatch("LOAD_PROMOTED_PRODUCTS");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
