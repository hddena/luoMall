<template lang="html">
  <van-tabbar v-model="active" class="tabbar">
    <van-tabbar-item replace to="/Home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/Category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item replace to="/Search" icon="search">搜索</van-tabbar-item>
    <van-tabbar-item replace to="/Cart" icon="shopping-cart-o" :info="count">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/User" icon="manager-o" v-if='userInfo'>我的</van-tabbar-item>
    <van-tabbar-item replace to="/Login" icon="manager-o" v-else>未登录</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import Util from '../util/common.js'
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem); //Tabbar 标签栏
export default {
  name: 'Tabbar',
  data() {
    return {
      active:0,
    }
  },
  watch: {
    $route (to, from) {
      //console.log(this.$route.path);
      //console.log('to:'+to.path);
      //console.log('from:'+from.path);
      if (this.$route.path.indexOf('Home') > 0) {
        this.active = 0
      } else if (this.$route.path.indexOf('Category') > 0) {
        this.active = 1
      } else if (this.$route.path.indexOf('Cart') > 0) {
        this.active = 2
      } else if (this.$route.path.indexOf('User') > 0) {
        this.active = 3
      } else {
        this.active = 0
      }
      console.log(this.active );
      /*
      switch(表达式) {
         case n:
            代码块
            break;
         case n:
            代码块
            break;
         default:
            默认代码块
      } 
      */
    },


  },
  computed: {
    count () {
      //页面刷新后 数据会消失,解决:加判断
      if (this.$store.state.detail.count == '') {
        this.$store.commit('CHANGE_COUNT');
      }
      return this.$store.state.detail.count
    },
    userInfo () { // 用户信息
      if (this.$store.state.login.userInfo) {
        return this.$store.state.login.userInfo;
      } else if(Util.getLocal('userInfo')) {
        return Util.getLocal('userInfo').data;
      } else {
        return false;
      }
    },
  },
  mounted: function() {
      let t = this;
      t.$nextTick(function() {
          //console.log(Util.getLocal('userInfo').data);
      });
  },
  methods: {
    onSearch(){
      //let paramsB = qs('id:41')
      let t = this;
      Toast('搜索功能未完善！无法搜索：'+t.value);
      console.log(t.value);
    },

  }
}
</script>

<style lang="less" scoped>
.tabbar{
  .van-tabbar{
    -webkit-box-shadow: 0 -1px 8px rgba(0,1,1,.08);
    box-shadow: 0 -1px 8px rgba(0,1,1,.08);
  }
}
</style>
