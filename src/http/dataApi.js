//import Vue from 'vue';
import axios from 'axios'
import qs from 'qs'
import store from '@/vuex/store.js'
import router from '../router'
// import qs from 'qs'

/*
import { Toast  } from 'vant';
Vue.use(Toast); //Toast 轻提示
Toast.loading({
  message: '加载中...',
  forbidClick: true
});
*/

const dataApi = axios.create();
// console.log( window.location.host );
/*
if (window.location.host.indexOf('localhost') >= 0 || window.location.host.indexOf('127.0.0.1') >= 0 || window.location.host.indexOf('192') >= 0) {
  //console.log('本地');
  dataApi.defaults.baseURL = '/dataApi';  //开发时开启
} else {
  //console.log('线上');
  dataApi.defaults.baseURL = '/';  //打包时开启
}
*/
dataApi.defaults.baseURL = '/dataApi';  //开发时开启
// dataApi.defaults.baseURL = '/';  //打包时开启

dataApi.defaults.timeout = 5000;
dataApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
dataApi.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
dataApi.defaults.withCredentials=true;//让ajax携带cookie
//buyyearApi.defaults.headers.post['Content-Type'] = 'multipart/form-data';


//请求拦截器
dataApi.interceptors.request.use(function (config) {
    // 在发起请求请做一些业务处理


      if(config.method === 'post'){
        config.data = qs.stringify(config.data)
      }

      if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = `token ${store.state.token}`;
      }
    return config;
  }, function (error) {
    // 对请求失败做处理
    console.log(error);
    alert('网络有点不问题，试一下刷新页面！');
    return Promise.reject(error);
  });
//响应拦截器
dataApi.interceptors.response.use(function (response) {

      let path = router.apps;
      console.log(path);

    // 对响应数据做处理
    //console.log(response);
    if (!response.data.Message || response.data.ret == 1 ) {
      //console.log(response.data);
      // console.log(router);
      // console.log(this.$route.path);
    } else {
      console.log('权限不足，需要登录！');
      // console.log(router);
      setTimeout(()=>{ // 未登录跳转到下面地址
        router.replace({
            path: '/login',
            // query: {redirect: router.currentRoute.fullPath}
        })
        // window.location.href=window.location.protocol+"//"+window.location.host+"/#/login";

      },1000);
    }
    return response;
  }, function (error) {
    // 对响应错误做处理
    console.log(error);
    //console.log('可能权限不足，试一下登录！');
    return Promise.reject(error);
  });

export default dataApi
