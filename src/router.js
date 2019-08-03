import Vue from "vue";
import Router from "vue-router";

const Home = () => import(/* webpackChunkName: "Home" */ "./views/Home.vue");
const Detail = () =>
  import(/* webpackChunkName: "Detail" */ "./views/Detail.vue");
const Search = () =>
  import(/* webpackChunkName: "Search" */ "./views/Search.vue");

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
      path: "(/|/tilbud)",
      name: "home",
      component: Home,
    },
  ],
});
