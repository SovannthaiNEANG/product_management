import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import UniqueId from 'vue-unique-id';

Vue.config.productionTip = false

Vue.use(store);
Vue.use(UniqueId);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
