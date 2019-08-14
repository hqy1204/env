import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_FLAG === 'pro') {
    //生产环境
  } else {
    //测试环境
  }
} else {
  //本地开发环境
}