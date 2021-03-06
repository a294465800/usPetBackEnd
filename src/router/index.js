import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import indexChart from '@/components/indexChart'
import infoCheckOne from '@/components/infoCheckOne'
import infoCheck from '@/components/infoCheck'
import infoPass from '@/components/infoPass'
import storeCategory from '@/components/storeCategory'
import storeCategoryUpload from '@/components/storeCategoryUpload'
import storeList from '@/components/storeList'
import storeChart from '@/components/storeChart'
import storeCommodity from '@/components/storeCommodity'
import orderList from '@/components/orderList'
import orderOne from '@/components/orderOne'
import orderDeal from '@/components/orderDeal'
import userList from '@/components/userList'
import userOne from '@/components/userOne'
import complaintList from '@/components/complaintList'
import complaintHandle from '@/components/complaintHandle'
//import test from '@/components/test'

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
          path: 'info/check/one',
          component: infoCheckOne,
          name: 'info_check_one'
        },
        {
          path: 'info/pass',
          component: infoPass,
          name: 'info_pass'
        },
        {
          path: 'store/category',
          component: storeCategory,
          name: 'store_category'
        },
        {
          path: 'store/category/upload',
          component: storeCategoryUpload,
          name: 'store_category_upload'
        },
        {
          path: 'store/list',
          component: storeList,
          name: 'store_list'
        },
        {
          path: 'store/list/account',
          component: storeChart,
          name: 'store_chart'
        },
        {
          path: 'store/list/commodity',
          component: storeCommodity,
          name: 'store_commodity'
        },
        {
          path: 'order/list',
          component: orderList,
          name: 'order_list'
        },
        {
          path: 'order/one',
          component: orderOne,
          name: 'order_one'
        },
        {
          path: 'order/deal',
          component: orderDeal,
          name: 'order_deal'
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
        },
        {
          path: 'complaint/list',
          component: complaintList,
          name: 'complaint_list'
        },
        {
          path: 'complaint/handle',
          component: complaintHandle,
          name: 'complain_handle'
        }
      ]
    }
  ]
})
