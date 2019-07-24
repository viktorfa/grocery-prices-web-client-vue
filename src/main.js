import Vue from "vue";
import "./plugins/vuetify";
import VueMeta from "vue-meta";

import store from "./store";
import router from "./router";
import App from "./App.vue";
import LazyLoadDirective from "./directives/LazyLoadDirective";
import "./main.css";

Vue.config.productionTip = false;
Vue.directive("lazyload", LazyLoadDirective);

Vue.use(VueMeta);

store.dispatch("LOAD_PROMOTED_PRODUCTS");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
