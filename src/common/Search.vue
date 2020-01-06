<template lang="html">
  <div class="search">
    <!-- <h1>{{$store.state.category.proList}}</h1> -->
    <van-search
      v-model="value"
      placeholder="请输入名称搜索"
      shape="round"
      @search="onSearch"
      @focus="searchFocus()"
    >
    <div slot="action" @click="onSearch">搜索</div>
    </van-search>

    <h1 v-if="value && searchData.length != 0">正在搜索：<span style="color: #f00;" v-text="value"></span></h1>
    <v-prolist :proLists='searchData' colNum="2" :num='num[2]' :title='searchResultTitle' v-if="value"/>
    <!-- <h1 v-else-if="searchData.length == 0 ">没找搜索到！</h1> -->
    <!-- <h1 v-else-if="searchResult == -1 ">没找搜索到！</h1> -->
    <h1 v-else><span v-show="this.$route.path == '/Search'">请输入关键字进行搜索！</span></h1>
    <!-- <h1 v-show="searchData.length == 0 && this.$route.path == '/Search' ">没找到搜索内容！</h1> -->
    <h1 v-show="value && searchData.length == 0 && this.$route.path == '/Search' ">没找到<span style="color: #f00;" v-text="value"></span>的内容！</h1>

    <!-- <v-prolist :proLists='searchData' colNum="2" num='100' title='testTitle' /> -->

  </div>
</template>
<script>

import Vue from 'vue';
import ProList from '@/common/ProList'
import { Search , Toast } from 'vant';
Vue.use(Search);

export default {
  name:"Search",

  components: {
    'v-prolist': ProList,
  },

  data() {
    return {
      value:'',
      searchResultTitle:'搜索结果',
      num:[20,40,60],
    }
  },
  props: {
    classLists: {
      type: Array,
      default: function () {
        return []
      }
    },
    proLists: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    proLists(newValue,oldValue){
      //console.log(newValue,oldValue);
   }
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },

    searchData: function() {
        var t = this; 
        var search = this.value;
        // console.log(t.proLists);
        if (search) {
            return t.proLists.filter(function(product) {
                return Object.keys(product).some(function(key) {
                    // toLowerCase() 方法用于把字符串转换为小写
                    // return String(product[key]).toLowerCase().indexOf(search) > -1
                    t.searchResult = String(product[key]).indexOf(search);
                    //console.log(typeof t.searchResult);
                    return String(product[key]).indexOf(search) > -1
                })
            })
        }
        return this.proLists;
    }

  },

  mounted: function() {
      let t = this;
      t.$nextTick(function() {
          //t.getClassList(); //产品类别列表
      });
  },
  methods: {
    onSearch(){
      //let paramsB = qs('id:41')
      let t = this;
      //Toast('搜索功能未完善！无法搜索：'+t.value);
      console.log(t.value);
      //t.value = '';
    },
    searchFocus(){  // 检测input获得焦点事件 跳转
      if (this.$route.path != '/Search') {
        this.$router.push({
          name: '搜索',
          //params: {'pid': res}
        })
      } else {
        console.log('搜索焦点：searchFocus');
        console.log(this.$route.path);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search{
  /*margin-bottom: 10px;*/
  h1{
    text-align: center;
    line-height: 200%;
    font-size: 20px;
  }
  .proLists{
    margin-top: 10px;
  }
}
</style>
