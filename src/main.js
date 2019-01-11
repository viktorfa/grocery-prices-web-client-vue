import Vue from 'vue'
import './plugins/vuetify'

import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

store.dispatch('INITIALIZE_PRODUCTS')
store.dispatch('LOAD_PROMOTED_PRODUCTS')

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
