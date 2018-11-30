import Vue from 'vue'

import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

store.dispatch('INITIALIZE_PRODUCTS')

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
