import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Detail from "./views/Detail.vue";
import Search from "./views/Search.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/sok/:query?",
      name: "search",
      component: Search,
    },
    {
      path: "/tilbud/:id",
      name: "detail",
      component: Detail,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
  ],
});
