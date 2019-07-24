import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

import OfferDetail from "../OfferDetail.vue";
import exampleOffer from "../../../tests/assets/amp-offer.json";

describe("OfferDetail", () => {
  let localVue;
  let store;
  let actions;
  let state;
  let router;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);
    localVue.use(Vuetify);
    state = { detailProduct: exampleOffer, similarProducts: [] };
    actions = {
      anus: jest.fn(),
    };
    store = new Vuex.Store({ actions, state });
    router = new VueRouter();
    window.scrollTo = jest.fn(() => {
      console.log("Scrollin'");
    });
  });
  it("should render", () => {
    const mountedComponent = shallowMount(OfferDetail, {
      store,
      localVue,
      router,
    });
    expect(mountedComponent).toBeTruthy();
  });
  it("should have a product property", () => {
    const mountedComponent = shallowMount(OfferDetail, {
      store,
      localVue,
      router,
    });
    expect(mountedComponent.vm.detailProduct).toBeTruthy();
    console.log("vm.product");
    console.log(mountedComponent.vm.product);
    expect(mountedComponent.vm.product).toBeTruthy();
  });
});
