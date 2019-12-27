<template lang="html">
  <section class="news">
    <v-navbar/>
    <h1>News</h1>
    <van-cell-group>
      <van-cell v-for="(k,i) in newsList" :title="k.newsTitle" value="内容" :label="k.newsContent" :key="i" icon="description"is-link :to="{name:'资讯详情' , params:{id:k.newsID}}" />
    </van-cell-group>
    <v-divider/>
    <v-tabbar/>
  </section>
</template>

<script>
  import Vue from 'vue';
  import NavBar from '@/common/NavBar'
  import Divider from '@/common/Divider.vue';
  import Tabbar from '@/common/Tabbar'
  import Util from '../util/common.js';

import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

export default {
  name:'news',
  components:{
    'v-navbar': NavBar,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  data(){
    return {
      newsList:'',
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
        this.getListByCID();
      });
  },

  methods:{
    getListByCID(){
      let t = this ;
      Util.newsList(t,'e24c07e9-c24b-4275-8c7e-4809bb77dec3').then((value) => { // 获取当前用户信息（会员）
        //t.userInfo = Object.assign(t.userInfo, value.data);
        t.newsList = value.data;
        console.log(t.newsList);
      });
    },

  }
}

</script>

<style lang="less" scoped>
.news{
  color:#000;
}
</style>
