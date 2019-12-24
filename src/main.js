// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import store from '@/vuex/store.js'   //vuex
import dataApi from '@/http/dataApi.js'       //http数据请求

Vue.prototype.$dataApi = dataApi;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//全局定义过滤器
Vue.filter('moneyFormat', function (value) { // 保留两位小数
  return '￥'+value.toFixed(2);
})

Vue.filter('parameterFormat', function (value) {  // 参数格式 ， 去除多余的符号
  return value.replace('{', '').replace('}', '').replace(':', '：').replace(':', '：').replace(',', '，').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
})