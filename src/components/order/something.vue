<template lang="html">
  <div class="orderList">

    <van-panel
      v-for="(k,i) in orderList" :key="i"
      v-if="k.ord_status_name == orderType || orderType == null"
      :title="'收货人：'+k.memUserName"
      :desc="k.createTime"
      :status="k.ord_status_name">
        <div class="addrDetail">收货地址：{{k.addrDetail}}</div>
        <div class="total">
          <!-- <span>{{k.createTime}}</span> -->
          <span>共有 {{k.totalCount}} 件商品</span>
          <!-- <span>总金额：{{k.totalPrice | moneyFormat}}</span> -->
          <span>总金额：{{k.totalPrice}}</span>
        </div>
        <div slot="footer">
          <!-- <van-button size="small">按钮</van-button> -->
          <van-button size="small" type="danger" @click="getList_currentUser(i,k.orderID)">订单详情</van-button>
        </div>
    </van-panel>

  </div>
</template>

<script>

import Util from '../../util/common'
import Vue from 'vue';
import { Panel , Dialog , Card  } from 'vant';
Vue.use(Panel);

Vue.use(Dialog);
Vue.use(Card);

export default {
  data() {
    return {
      orderListDetail: null,
      orderDetail: null,
      show:false,
    }
  },
  computed: {
    carList () {
      return this.$store.state.detail.carList;
    },
  },
  props: {
    orderList: null,
    orderType: null,

  },
  components:{
    //[Dialog.Component.name]: Dialog.Component
  },
  mounted() {
    // 初始化先获取购物车商品列表 否则 页面刷新出Bug
    if (this.$store.state.detail.carList == "") {
      this.$store.commit('RESET_CARLIST')
     }
  },

  methods: {

    toggle () {
      this.$nextTick(() => {
        this.$store.dispatch('cutCarList', this.carList)
      })
    },
    getList_currentUser(i,ordID){ // 获取某个订单详情（会员）
      this.$router.push({
        name: '订单详细',
        params: {'whatNumber': i,'ordID': ordID}
      })
      //console.log(ordID,this.orderList[i])
    },

  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/fz.less";

.orderList {
  .van-cell-group{
    margin-bottom: 10px;
    .addrDetail{

    }
    .van-panel__content{
      .addrDetail , .total{
        padding:5px 16px;
      }
    }

    .van-panel__footer{
      > div{
        text-align: right;
      }
    }
  }
  .van-dialog{
    top: 10%;

    
  }
}
</style>
