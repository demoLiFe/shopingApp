import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from 'uview-ui'
Vue.use(uView)
import api from './api/api.js'
Vue.prototype.$api = api;
import store from './store/index.js';
Vue.prototype.$store = store;
import directives from './directives/directives.js'

//自定义指令
Vue.use(directives)

//全局混入
Vue.mixin({
	methods:{
		//是否跳转去登陆
		whetherJumpToLogin(){
			uni.showModal({
				content:'你还没有登录,是否去登陆',
				title:'提示',
				confirmText:'去登陆',
				success: (res) => {
					if(res.confirm){
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}
				}
			})
		},
	}
})

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