import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
	returnValue(res) {
	  if (!isPromise(res)) {
		return res;
	  }
	  return new Promise((resolve, reject) => {
		res.then((res) => {
		  if (res[0]) {
			reject(res[0]);
		  } else {
			resolve(res[1]);
		  }
		});
	  });
	},
	});
	uni.interceptors.request.use((config) => {
	  const token = uni.getStorageSync('access_token')
	  if (token) {
		config.header.Authorization = token
	  }
	  return config
	});

	uni.interceptors.response.use((response) => {
	  if (response.statusCode === 401) {
		uni.navigateTo({
		  url: '/pages/login/login.vue'
		})
	  }
	  return response
	});
} catch (error) { }


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