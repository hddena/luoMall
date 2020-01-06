<template lang="html">
    <div class="order">
      <!-- slot分发内容 让子组件混合父组件的内容 -->
      <v-navbar/>
      <van-tabs v-model="active" animated>
        <van-tab v-for="(k,i) in 5" :title="orderType[i]" :key='i'>
          <v-something v-bind:orderList="order" v-bind:orderType="orderType[i]"/>
        </van-tab>
      </van-tabs>
    <v-divider/>
    <v-tabbar/>
    </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);

import NavBar from '@/common/navBar/navBar'
//import Nothing from '@/components/order/nothing.vue'
import Something from '@/components/order/something.vue'
//import Detail from '@/components/order/order_detail.vue'
import Divider from '@/common/Divider'
import Tabbar from '@/common/Tabbar'
export default {
  data() {
    return {
      active: 0,
      order:null,
      orderType:['未付款','已付款','已发货','已收货','已完成',]
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
  components:{
    'v-navbar':NavBar,
    //'v-nothing':Nothing,
    'v-something':Something,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  computed:{
    count(){
      return this.$store.state.detail.count
    }
  },
  mounted() {
    let t = this ;
    t.$nextTick(function() {
        t.getList_currentUser(); //获取当取用户订单
    });
  },
  methods: {

    getList_currentUser(){ //获取当取用户订单（会员）
      //let paramsB = qs('id:41')
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getList_currentUser',
        params: {
          id:1,
          name:2
        }
      }).then((response) => {
        // console.log(this.order ==  undefined);
        if (response.data.data ==  undefined) {
          this.$store.commit('CHANGE_TOKEN',0);
          this.$router.replace({
            //path: 'login'
            path: '/login'
          })
        } else {
          this.$store.commit('CHANGE_TOKEN',1);
          this.order = response.data.data;

        }
      }).catch(function(error) {
        console.log(error)
      })
    },
  }
}
</script>
<style lang="less" scoped>
.order {
  width: 100%;
  padding-bottom: 14vw;
}

</style>