// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from  'axios'
import 'iview/dist/styles/iview.css'
import './public/css/main.css'
import globalData from './components/globalData.vue'

Vue.use(iView)
Vue.prototype.$http = axios
Vue.prototype.$global = globalData.globalData
Vue.config.productionTip = false

/**
* 全局钩子，当未登录时自动跳转登录
* */
//sessionStorage.user判断登录状态
router.beforeEach((to, from, next) => {
  if (sessionStorage.user){
    if(to.name === 'Login'){
      next(from.path)
    }else {
      next()
    }
  }else {
    if (to.name !== 'Login'){
      next({path: '/login'})
    }else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
