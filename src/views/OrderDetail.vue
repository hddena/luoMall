<template lang="html">

  <section class="order_detail">
    <v-navbar/>

    <div class="detail" v-if="otherContent">
      <p><span>收货人：</span><span>{{otherContent.memUserName}}</span></p>
      <p><span>联系电话：</span><span>{{otherContent.mobile}}</span></p>
      <p><span>收货地址：</span><span>{{otherContent.addrDetail}}</span></p>
      <p><span>下单时间：</span><span>{{otherContent.createTime}}</span></p>
      <p><span>订单总价：</span><span>{{otherContent.totalPrice}}</span></p>
    </div>

    <van-card
      v-if="orderDetail"
      v-for="(k,i) in orderDetail"
      :key="i"
      :num="k.proCounts"
      :price="k.price"
      desc="描述信息"  
      :title="k.pname"
      :thumb="imgPath.imgSmall + k.pimg.split(',')[0]" 
      v-on:click="detail(k.pid)"
    />
    <v-divider/>
    <v-tabbar/>
  </section>

</template>

<script>
import NavBar from '@/common/navBar/navBar'
import Divider from '@/common/Divider'
import Tabbar from '@/common/Tabbar'
import Util from './../util/common'

import Vue from 'vue';
import { Card  } from 'vant';
Vue.use(Card);


export default {
  data() {
    return {
      orderDetail: null,
      otherContent:null
    }
  },
  components: {
    'v-navbar': NavBar,

    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
  },
  props: {

  },
  mounted() {
    let t = this ;
    t.$nextTick(function() {
        t.getList_currentUser(); //获取当取用户订单（会员）
        t.getListForOrderID(this.$route.params.ordID); //获取某个订单详情（会员）
        console.log(this.$route.params.whatNumber);

        console.log(this.imgPath.imgSmall);
    });
  },
  methods: {
    getList_currentUser(){ // 获取当取用户订单（会员）
      //let paramsB = qs('id:41')
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getList_currentUser',
        //url: '/mobile/index.php?m=console&c=view&a=view',
        params: {
          //ordID:ordID,
          name:2
        }
      }).then((response) => {
        this.otherContent = null;
        this.otherContent = response.data.data[this.$route.params.whatNumber];
        console.log(this.otherContent);
      }).catch(function(error) {
        console.log(error)
      })
    },
    getListForOrderID(ordID){ // 获取某个订单详情（会员）
      //let paramsB = qs('id:41')
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getListForOrderID',
        //url: '/mobile/index.php?m=console&c=view&a=view',
        params: {
          ordID:ordID,
          name:2
        }
      }).then((response) => {
        //console.log(response.data.data);
        //this.orderDetail = null;
        this.orderDetail = response.data.data;
        //this.otherContent = this.$route.params.content;
        //this.otherContent = this.$route.params.content;
        console.log(this.orderDetail)
      }).catch(function(error) {
        console.log(error)
      })
    },
    detail(pid){
      this.$router.push({
        name: '商品详情',
        params: {'pid': pid}
      })
    }

  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/fz.less";
.detail {
    background-color: #fff;
    padding: 8px 16px;
    position: relative;
    :before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background-size: 80px;
        content: '';
    }
    p{
      line-height: 125%;
      padding: 3px 5px;
      border-bottom: 1px solid #c3c3c3;
      span:first-of-type{
        color:#999;
      }
    }
  
}
</style>
