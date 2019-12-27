<template lang="html">
  <section class="newsDetail">
    <v-navbar/>
    <div class="content">
      <h1 class="nTitle" v-text="nDetail.newsTitle">news</h1>
      <div class="nContent" v-html="nDetail.newsContent"></div>
    </div>
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
      nDetail:'',
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
        this.getNewsDetail();
      });
  },

  methods:{
    getNewsDetail(){
      let id = this.$route.params.id;
      let t = this ;
      Util.newsDetail(t,id).then((value) => { // 获取当前用户信息（会员）
        //t.userInfo = Object.assign(t.userInfo, value.data);
        t.nDetail = value.data;
        console.log(t.nDetail);
      });
    },

  }
}

</script>

<style lang="less" scoped>
.newsDetail{
  color:#000;
  min-height: 100%;
  line-height: 200%;
  .content{
   min-height: 100%;
   background-color:#fff;
   padding: 5%;
    .nTitle{
      text-align: center;
      font-size: 120%;
      font-weight: bold;
      margin-bottom:15px;
      //border-bottom: 5px solid #d7d7d7;
    }
    .nContent{}

  }
}
</style>
