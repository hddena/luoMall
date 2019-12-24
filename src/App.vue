<template>
  <div id="app">

    <!-- <keep-alive> -->
      <router-view
        :classList="classListData"
        :proList="proListData"
      />
    <!-- </keep-alive> -->

    <!-- <v-loading v-show="fetchLoading"></v-loading> -->
  </div>
</template>

<script>
  //import 'https://res.wx.qq.com/open/js/jweixin-1.3.0.js';
  import Loading from '@/common/Loading';
  import './assets/css/cssreset.css';
  import './assets/css/main.css';
  import 'vant/lib/index.css';
  import Util from './util/common.js'
export default {
  name: 'App',
  components:{
    'v-loading':Loading
  },
  data() {
    return {
      classListData:null,
      proListData:null,
      weather:null,
    }
  },
  watch: {
    userInfo(newValue,oldValue){
      console.log(newValue,oldValue);
      if (newValue) {
        Util.extensionCode(); //地址栏添加推广码
      } else {
        console.log('用户还没登录！')
      }
    }
  },
  computed: {
    userInfo () { // 用户信息
      return this.$store.state.login.userInfo
    },
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        t.getClassList();
        t.getproList();
        //t.getWeather(); // 请求天气情况
        t.getAdvertisement();
        
        // t.clearCarList(); //在规定时间里清空购物车
        Util.carTimeDifference(); // 时间差的作用是为了超出时间后删除购物车内容
        // t.arraylist(); //数组排序
      });
  },
  methods: {
    arraylist(){ //数组排序
      var arr = [
        {'name': '张三', age: 26},
        {'name': '李四', age: 12},
        {'name': '王五', age: 37},
        {'name': '赵六', age: 0},
        {'name': '谭总', age: 18},
        {'name': '大宝', age: 0}
      ];
      var objectArraySort = function (keyName) {
       return function (objectN, objectM) {
        var valueN = objectN[keyName]
        var valueM = objectM[keyName]
        if (valueN < valueM) return 1
        else if (valueN > valueM) return -1
        else return 0
       }
      }
      arr.sort(objectArraySort('age'))
      console.log(arr)
    },

    getClassList(){  // 产品类别列表
      //let paramsB = qs('id:41')
      let t = this;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/product/getclassList',
      }).then((response) => {
        t.classListData = response.data.data;
        //console.log(t.classListData);
      }).catch(function(error) {
        console.log(error)
      })
    },
    getproList(){  // 产品列表
      //let paramsB = qs('id:41')
      let t = this;
      let u = new Object();
      if (this.$store.state.login.userInfo) {
        u = this.$store.state.login.userInfo;
      } else if(window.localStorage.getItem('userInfo')) {
        u = JSON.parse(window.localStorage.getItem('userInfo')).data;
      } else  {
        console.log('没用户信息');
      }

      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/product/getproList',
        params: {
          childType:u.childType,
          userType:u.userType
        }
      }).then((response) => {
        //JSON.parse(window.localStorage.getItem(key))
        t.proListData = response.data.data;


        for (var i = 0; i < response.data.data.length; i++) { // 图片将字符串字符转为数组
          t.proListData[i].pimg = response.data.data[i].pimg.split(',');
          //indexOf(item.time);
          for (var y = 0; y < t.proListData[i].pimg.length; y++) {
            if(t.proListData[i].pimg[y].indexOf('http') !== -1){
              console.log('图片地址完整！');
            }else{
              t.proListData[i].pimg[y]= this.$store.state.category.imgPath.imgMiddle + t.proListData[i].pimg[y];
              //console.log('不完整！');
            };
          }
        }

        this.$store.commit('PRO_LIST',t.proListData);
        //console.log(t.proListData);
        //console.log(Util.shuffle(t.proListData));
      }).catch(function(error) {
        console.log(error)
      })
    },
    getAdvertisement(){  // 获取广告列表
      //let paramsB = qs('id:41')
      let t = this;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/advertisement/list',
      }).then((response) => {
        this.$store.commit('ADV_LIST',response.data.data);
        //console.log(Util.shuffle(response.data.data));
      }).catch(function(error) {
        console.log(error)
      })
    },
    getWeather () {  // 天气
      let t = this;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'get',
        url: 'http://wthrcdn.etouch.cn/weather_mini',
        params: {
          city:'广州'
        }
      }).then((response) => {
        t.weather = response.data.data;
        console.log('今天'+t.weather.forecast[0].date+'，'+t.weather.city+'天气：'+t.weather.forecast[0].high+'，'+t.weather.forecast[0].low+'，'+t.weather.forecast[0].type)
      }).catch(function(error) {
        console.log(error)
      })
    },


    clearCarList(){ //在规定时间里清空购物车
      let nowYear = new Date().getFullYear(); // 获取当前年份
      let nowMonth = new Date().getMonth() + 1; // 获取当前月份
      let nowToday = new Date().getDate(); // 获取当前日期
      let nowHour = new Date().getHours(); //获取当前小时
      let nowMinute = new Date().getMinutes(); //获得当前分钟
      let nowSeconds = new Date().getSeconds() //获得当前秒
      //let time = 3000;
      switch(nowToday) {
       case 1:
          console.log(nowToday+'清空购物车');
          break;
       case 7:
          console.log(nowToday+'清空购物车');
          break;
       case 15:
          console.log(nowToday+'清空购物车');
          break;
       case 21:
          console.log(nowToday+'清空购物车');
          break;
       case 30:
          console.log(nowToday+'清空购物车');
          break;
       default:
          /*
          Toast({
            message: '今天是'+today+'号，不是提款日期！',
            duration: time
          });
          */
          console.log(nowYear+'年'+nowMonth+'月'+nowToday+'日'+nowHour+'时'+nowMinute+'分'+nowSeconds+'秒');

      }
      //console.log(today);
    },

  },
}
</script>
<style type="text/css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*字体抗锯齿渲染  chrome、safari */
  -webkit-font-smoothing: antialiased;
  /*字体抗锯齿渲染  firefox */
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

