// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './public/css/main.css'

Vue.use(iView)
Vue.config.productionTip = false

/**
* 全局钩子，当未登录时自动跳转登录
* */
let a = true  //假设false为未登录
router.beforeEach((to, from, next) => {
    console.log(from, to, 1)
  if (a){
    next()
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
