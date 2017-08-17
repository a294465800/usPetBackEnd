import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import indexChart from '@/components/indexChart'
import infoCheck from '@/components/infoCheck'
import infoPass from '@/components/infoPass'
import orderList from '@/components/orderList'
import userList from '@/components/userList'
import userOne from '@/components/userOne'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          component: indexChart,
          name: 'index_chart'
        },
        {
          path: 'info/check',
          component: infoCheck,
          name: 'info_check'
        },
        {
          path: 'info/pass',
          component: infoPass,
          name: 'info_pass'
        },
        {
          path: 'order/list',
          component: orderList,
          name: 'order_list'
        },
        {
          path: 'user/list',
          component: userList,
          name: 'user_list'
        },
        {
          path: 'user/list/one',
          component: userOne,
          name: 'user_one'
        }
      ]
    }
  ]
})
