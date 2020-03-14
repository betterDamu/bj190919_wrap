import Vue from 'vue'
import App from './App.vue'

import http from "@/http"
import router from "@/router"
import store from "@/store"


Vue.prototype.$http = http;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
