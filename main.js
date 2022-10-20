import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from 'uview-ui'
Vue.use(uView)
import api from './api/api.js'
Vue.prototype.$api = api;
import store from './store/index.js';
Vue.prototype.$store = store;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif