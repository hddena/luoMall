<template lang="html">
  <div class="afterSale">
    <v-search/>
    <!-- <a href="weixin://" οnclick="PIWI_SUBMIT.Weixin_Open()">点击跳转到微信</a> -->
    <v-swipe/>
    <!-- <router-link :to="{path:'/Login', params: { id: 'login' }}">登录</router-link> -->
    <v-prolist :proLists='proList'/>
    <v-divider/>
    <v-tabbar/>
  </div>
</template>
<script>
  
import Util from '../util/common.js'
import Search from '@/common/Search'
import Swipe from '@/components/index/Swipe'
import ProList from '@/common/ProList'
import Divider from '@/common/Divider'
import Tabbar from '@/common/Tabbar'
export default {
  name:"After sale 售后",
  components: {
    'v-search': Search,
    'v-swipe': Swipe,
    'v-prolist': ProList,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  data() {
    return {
      //classList:null,
      //proList:null,
      loading: true,
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
  watch: {
    //classLists(newValue,oldValue){
    classList(newValue,oldValue){
      //console.log(newValue,oldValue);
    },
    proList(newValue,oldValue){
      //console.log(newValue,oldValue);
    },
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        //console.log(this.imgPath);
      });
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

.afterSale {
    width: 100%;
    padding-bottom: 14vw;
    /*background-color: #F8FCFF;*/
    /*margin-top: -20px;*/
}
</style>
