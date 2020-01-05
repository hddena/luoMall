<template lang="html">
  <div class="searchPage">
  	<!-- <h1>搜索</h1> -->
    <v-search :proLists='proListData' />
    <v-divider/>
    <v-tabbar/>
  </div>
</template>
<script>
  
import Util from '../util/common.js'
import Search from '@/common/Search'
import Divider from '@/common/Divider'
import Tabbar from '@/common/Tabbar'
export default {
  components: {
    'v-search': Search,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  data() {
    return {
      //searchResultTitle:'搜索结果',
      classList:null,
      // proList:null,

      proListData:{
        type: Array,
        default: function () {
          return []
        }
      },


      loading: true,
    }
  },
  watch: {
    proList(newValue,oldValue){
      //console.log(newValue,oldValue);
   }
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        console.log(this.imgPath);
        t.getClassList();
        t.getproList();
      });
  },
  methods: {
    getClassList(){
      //let paramsB = qs('id:41')
      let t = this;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/product/getclassList',
      }).then((response) => {
        t.classList = response.data.data;
        console.log(t.classList);
      }).catch(function(error) {
        console.log(error)
      })
    },



    getproList(){  // 产品列表
      // console.log('getproList + 产品列表')
      let t = this;
      let stateUserInfo = new Object();
      let stateImgPath = this.$store.state.category.imgPath;
      stateUserInfo = this.userInfo;

      Util.proList(t, stateUserInfo , stateImgPath).then((value) => { // 获取当前用户信息（会员）
        //t.userInfo = Object.assign(t.userInfo, value.data);
        t.proListData = value;
        // console.log(t.proListData);
      });
    },



/*
    getproList(){
      //let paramsB = qs('id:41')
      let t = this;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/product/getproList',
      }).then((response) => {
        t.proList = response.data.data;
        //console.log(t.proList);
      }).catch(function(error) {
        console.log(error)
      })
    },
    */
  }
}
</script>

<style>

.searchPage {
    width: 100%;
    /*padding-bottom: 14vw;*/
    /*background-color: #F8FCFF;*/
    /*margin-top: -20px;*/

}
.searchPage .proLists{
  /*margin-top: 10px;*/
}
</style>
