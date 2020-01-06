<template>
  <div class="user">
    <v-navbar/>
    <v-info :info="userInfo" :amountCommissions="amountCommission" :listCommission="listCommission"/>
    <v-order/>
    <div class="user-poster">
      <!-- <img src="https://www.apple.com/v/iphone-11-pro/a/images/overview/camera/camera_fov_ultrawide__e4xq1jl1q76u_large.jpg"> -->
      <img src="../assets/img/user_banner.jpg">
    </div>
    <van-cell-group>
      <van-cell icon="shopping-cart-o" title="购物车" is-link to="/Cart"/>
      <van-cell icon="location-o" title="收货地址" is-link to="/Address"/>
      <van-cell icon="gold-coin-o" title="积分记录" is-link v-on:click="getListCommission()"/>
      <!-- <van-cell icon="service-o" title="客服中心" is-link /> -->
      <van-cell icon="records" title="用户协议" is-link :to="{name:'资讯详情' , params:{id:'81419924-565e-4285-a1ee-1c13a786bc62'}}" />
    </van-cell-group>
    <v-service/>
    <v-divider/>
    <v-tabbar/>
  </div>
</template>

<script>
import Util from '../util/common.js'

import NavBar from '@/common/navBar/navBar'
import Info from '@/components/user/Info'
import Order from '@/components/user/Order'
import Service from '@/components/user/Service'
import Divider from '@/common/Divider'
import Tabbar from '@/common/Tabbar'

import { Toast , Row, Col, Icon, Cell, CellGroup } from 'vant';

//Vue.use(Toast);

export default {
  name:'User',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    'v-navbar': NavBar,
    'v-info': Info,
    'v-order': Order,
    'v-service': Service,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  data(){
    return {
      userInfo:null,
      amountCommission:null,
      listCommission:null,
    }
  },
  props: {
    classList: {
      type: Array,
      default: function () {
        return []
      }
    },
    proList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  mounted: function() {
    let t = this ;
    t.$nextTick(function() {
      t.getMember(); // 获取当前用户信息
      //console.log(t.userInfo);
    });
  },
  methods:{
    getMember(){ // 获取当前用户信息
      //let paramsB = qs('id:41')
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getMember',
        //url: '/mobile/index.php?m=console&c=view&a=view',
        params: {
          id:1,
          name:2
        }
      }).then((response) => {
        if (response.data.ret == 1) {
          //this.$store.commit('CHANGE_TOKEN',1);
          this.$store.commit('USER_INFO',response.data.data); //用户信息赋值到 Vuex
          this.userInfo = response.data.data;
          console.log('当前会员共登录：'+this.userInfo.memLoginCount+'次');
          //console.log(response.data.data);
          console.log(this.userInfo);
          this.getAmountCommission() ; // 获取当取用户佣金总额
          this.getListCommission(); // 获取当取用户佣金列表
          window.localStorage.removeItem("userInfo");
          Util.setLocalStorage('userInfo', response.data.data);
        } else {
          //this.$store.commit('CHANGE_TOKEN',0);
          /*
          this.$router.replace({
            //path: 'login'
            path: '/login'
          })
          */
          console.log('需要登录！')
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    getAmountCommission(){ // 获取当取用户佣金总额
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getAmountCommission',
        //url: '/mobile/index.php?m=console&c=view&a=view',
        params: {
          id:1,
          name:2
        }
      }).then((response) => {
        if (response.data.data) {
          this.amountCommission = response.data.data;
        } else {
          this.amountCommission = 0;
        }
        //console.log(response.data);
      }).catch(function(error) {
        //console.log(error)
      })
    },
    getListCommission(){ // 获取当取用户佣金列表
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getListCommission',
        //url: '/mobile/index.php?m=console&c=view&a=view',
        params: {
          id:1,
          name:2
        }
      }).then((response) => {
        if (response.data.ret == 1) {
          console.log(response.data);
          console.log(response.data.data.length);
          //this.getListCommission(); // 获取当取用户佣金列表
          this.listCommission = response.data.data;
          
          if (response.data.data.length == 0) {
            Toast('您还没有记录！努力赚取积分吧！');
          } else {
            console.log(this.listCommission);
          }
        } else {
          
        }
      }).catch(function(error) {
        console.log(error)
      })
    }
  }
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    height: 20vw;
    display: block;
    overflow: hidden;
    margin-bottom: 10px;
    position: relative;
    img{
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
    }
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-col{

      .van-icon {
        display: block;
        font-size: 230%;
        color: #dd9e58;
        margin-bottom: 10%;
      }
    }

  }
  .van-cell-group{
    .van-cell{
      line-height: 200%;
      .van-icon:before{
        color:#f00;
      }
    }

  }
}
</style>
