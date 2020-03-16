import Vue from 'vue'
import App from './App.vue'

import http from "@/http"
import router from "@/router"
import store from "@/store"


//注册vue的全局组件
import HeaderTop from "components/HeaderTop/HeaderTop.vue"
Vue.component("HeaderTop",HeaderTop)

Vue.prototype.$http = http;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
