import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'http://localhost:5000/api'
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
	uni.addInterceptor({"request":{
		invoke: function(args) {
			const token = uni.getStorageSync('access_token')
			args.url=`{uni.$baseurl}/{args.url}`
			if (token) {
				if(!args.header) args.header = {}
				args.header.Authorization = `Bearer ${token}`
			}
			return args
		},
		success: function(res) {
			if (res.statusCode === 200) {
				return res.data
			}
		},
		fail: function(err) {
			console.log("interceptor-fail",err)
		},
		complete: function(res) {
			console.log("interceptor-complete",res)
			if (res.statusCode === 401) {
				uni.navigateTo({
					url: '/pages/login/login.vue'
				})
			}
		}	
	}})
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