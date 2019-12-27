
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

//const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
//const Index = () => import('@/views/Index')


import Index from '@/views/Index'
import Category from '@/views/Category'
import GoodsDetail from '@/views/GoodsDetail'
import Cart from '@/views/Cart'
import Pay from '@/components/Cart/Pay'
import User from '@/views/User'
import Address from '@/views/Address'
import AddressAdd from '@/views/AddressAdd'
import AddressModify from '@/views/AddressModify'
import Order from '@/views/Order'
import AfterSale from '@/views/AfterSale'
import OrderDetail from '@/views/OrderDetail'
import Login from '@/views/Login'
import Register from '@/views/Register'
import updateMember from '@/views/updateMember'
import SearchPage from '@/views/SearchPage'
import News from '@/views/News'
import NewsDetail from '@/views/NewsDetail'

/*
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/Index.vue'], resolve)
const Category = resolve => require(['@/views/Category.vue'], resolve)
const GoodsDetail = resolve => require(['@/views/GoodsDetail.vue'], resolve)
const Cart = resolve => require(['@/views/Cart.vue'], resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
const Address = resolve => require(['@/views/Address.vue'], resolve)
const AddressAdd = resolve => require(['@/views/AddressAdd.vue'], resolve)
const AddressModify = resolve => require(['@/views/AddressModify.vue'], resolve)
const Order = resolve => require(['@/views/Order.vue'], resolve)
const AfterSale = resolve => require(['@/views/AfterSale.vue'], resolve)
const OrderDetail = resolve => require(['@/views/OrderDetail.vue'], resolve)
const Login = resolve => require(['@/views/Login.vue'], resolve)
const Register = resolve => require(['@/views/Register.vue'], resolve)
const SearchPage = resolve => require(['@/views/SearchPage.vue'], resolve)
*/
export default new Router({

scrollBehavior (to, from, savedPosition) { // 路由跳转到新页面置顶
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  // mode: 'history',
  routes: [
    {
      path: '/home',
      name: '首页',
      component: Index
    },
    {
      path: '/Category',
      name: '分类',
      component: Category,
      children: [{
        path: '/Category/:className',
        name: '商品分类',
        component:Category
      }]
    },
    {
      path: '/GoodsDetail/:pid',
      name: '商品详情',
      component: GoodsDetail
    },
    {
      path: '/News',
      name: '资讯列表',
      component: News
    },
    {
      path: '/NewsDetail/:id',
      name: '资讯详情',
      component: NewsDetail
    },
    {
      path: '/Cart',
      name: '购物车',
      component: Cart
    },
    {
      path: '/Cart/Pay',
      name: '支付页',
      component: Pay
    },
    {
      path: '/User',
      name: '用户中心',
      component: User
    },
    {
      path: '/Address',
      name: '地址',
      component: Address
    },
    {
      path: '/AddressAdd',
      name: '添加地址',
      component: AddressAdd
    },
    {
      path: '/AddressModify/:addrID',
      name: '修改地址',
      component: AddressModify
    },
    {
      path: '/updateMember',
      name: '更新用户信息',
      component: updateMember
    },
    {
      path: '/Order',
      name: '订单',
      component: Order
    },
    {
      path: '/OrderDetail/:whatNumber/:ordID',
      name: '订单详细',
      component: OrderDetail
    },
    {
      path: '/AfterSale',
      name: '售后',
      component: AfterSale
    },
    {
      path: '/Login',
      name: '登录',
      component: Login
    },
    {
      path: '/Register',
      name: '注册',
      component: Register
    },
    {
      path: '/Search',
      name: '搜索',
      component: SearchPage
    },
    { 
      path: '/', 
      redirect: '/home' 
    },
    { 
      path: '*', 
      redirect: '/home' 
    }
  ]
})
