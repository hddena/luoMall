<template lang="html">
  <div class="topUser">
    <div class="title"><van-button plain type="info" icon="wap-home-o" size="small" to="/home" >美折购</van-button></div>

    <div class="userInfo"  v-if="userInfoFn">

      <van-button plain type="info" icon="user-circle-o" size="small" to="/User" v-if="userInfoFn.nickName">{{userInfoFn.nickName}} - {{userInfoFn.userTypeName}}</van-button>
      <van-button plain type="info" icon="user-circle-o" size="small" to="/User" v-else>{{userInfoFn.userName}} - {{userInfoFn.userTypeName}}</van-button>

    </div>
    <div class="userInfo"  v-else>
      <van-button plain type="info" icon="user-circle-o" size="small" to="/Login">未登录</van-button>
    </div>

  </div>
</template>
<script>
import Vue from 'vue';
import Util from '../util/common'
import { Notify } from 'vant';
Vue.use(Notify);

import { Icon } from 'vant';
Vue.use(Icon);

export default {
  data() {
    return {
      userInfo:null,
    }
  },
  mounted: function() {
      let t = this;
      t.$nextTick(function() {
          // t.getLocalUserInfo(); 
          // console.log(this.userInfoFn);
      });
  },
  computed: {
    userInfoFn () {
      return this.$store.state.login.userInfo
    },
  },
  methods: {
    getLocalUserInfo() {
      this.userInfo = Util.getLocal('userInfo');
      if (this.userInfo) {
        console.log(this.userInfo.data);
      } else {
        console.log('本地没会员信息');
      }
      /*
      this.$router.replace({
        //path: 'login'
        path: '/home'
      })
      */
    },
  }
}
</script>

<style lang="less" scoped>
.topUser{
  width: 100%;
  padding: 2%;
  box-shadow: 0 1px 1px #DCDCDC;
  background-color: #f8f8f8;
    .title{
      color: #f00;
      float: left;
      width: 55%;
      line-height: 100%;
      font-size: 130%;
      font-weight: bolder;

      .van-button--plain.van-button--info{
        border:none;
        color: #f00;
        font-size: 100%;
        background-color: rgba(255,255,255,0)!important;
      }

    }
    .userInfo{
      float: left;
      width: 45%;
      text-align: center;
      .van-button--plain.van-button--info{
        border:none;
        color: #000;
        font-size: 100%;
        background-color: rgba(255,255,255,0)!important;
        .van-button__icon{
          font-size: 1.5em;
        }
      }
    }
}
.topUser:after {
    content: ".";
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow:hidden;
}
</style>
