<template lang="html">
  <div class="category">
  <v-navbar/>
  <v-search/>
    <!-- <div>{{userInfo}}</div> -->
    <keep-alive>
    <div class="tabTabs">
      <van-tabs v-model="tabsActive" sticky @click="onClickTabs">
        <van-tab name="全部" title="全部">
          <v-goodslist :proLists='proListData' :num='10' title='全部'/>
        </van-tab>
        <van-tab v-for="(k,i) in classList" :name="k.cname" :title="k.cname" :key="i">
          <v-goodslist :proLists='proListData' :num='10' :title='k.cname'/>
        </van-tab>
      </van-tabs>
    </div>
  </keep-alive>

    <div class="bottomPic"><van-image lazy-load fit="cover" src="https://www.apple.com/v/iphone-11-pro/a/images/overview/camera/night_mode_hero__bhkljycv3v36_large.jpg" /></div>
  <v-divider/>
  <v-tabbar/>
  </div>
</template>
<script>
import Util from '../util/common.js'
import NavBar from '@/common/navBar/navBar'
import Search from '@/common/Search'
import GoodsList from '@/components/category/GoodsList'
import Sidebar from '@/components/category/Sidebar'
import Main from '@/components/category/Main'

import Divider from '@/common/Divider'
import Tabbar from '@/common/Tabbar'

import Vue from 'vue';
import { Toast  } from 'vant';
import { Tab, Tabs } from 'vant';
import { CountDown } from 'vant';
Vue.use(CountDown);
Vue.use(Tab).use(Tabs);
Vue.use(Toast); //Toast 轻提示

// Sticky 粘性布局
import { Sticky } from 'vant';
Vue.use(Sticky);

export default {
  name:"category",
  components: {
    'v-navbar': NavBar,
    'v-search': Search,
    'v-sidebar': Sidebar,
    'v-goodslist': GoodsList,
    'v-main': Main,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  data() {
    return {
      routeClassName:null,
      loading: true,
      topHeight:null,
      scroll:null,
      tabsActive: 'all',
      proListData:{
        type: Array,
        default: function () {
          return []
        }
      },

    }
  },

  props: {
    classList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    imgPath () { // 图片地址
      return console.log('abc');
    },
    classList(newValue,oldValue){
      //console.log(newValue,oldValue);
      console.log(this.$route.params.className);
    },
    proList(newValue,oldValue){
      //console.log(newValue,oldValue);
    },
    userInfo (newValue,oldValue) { // 监测到 userInfo 值有变化时重新获取商品信息
      this.getproList();  // 产品列表
    },
  },
  computed: {

    userInfo () { // vuex userInfo
      return this.$store.state.login.userInfo
      t.getproList();  // 产品列表
    },

    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
    proListPath () { // 图片地址
      let list ;
      if (this.proList) {
        list = this.proList;
        //console.log(this.proList[0].pimg.split(','));
        //if (.indexOf(item.time)) {}
        for (var i = 0; i < list.length; i++) {
          //console.log(this.proList[i].pimg.split(','));
          //list[i].pimg.split(',');
        }
        //console.log(list);
      } else {

      }
      //return this.$store.state.category.imgPath
    },
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        //console.log(this.$route);
        //console.log(this.imgPath);
        // window.addEventListener('scroll', this.handleScroll); //监听滚动条
        // t.classFilter();  // 路由切换

        t.getproList();  // 产品列表
      });
  },
  methods: {

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

    setStyle(){ // 初始化样式
      let tabTabs = document.getElementsByClassName('TabTabs')[0];
      let tabTabsTitle = tabTabs.getElementsByClassName('van-tabs__wrap')[0];
      console.log(tabTabsTitle);
    },

    handleScroll () { //监听滚动条
/*
      let sidebar = document.getElementsByClassName('sidebar')[0];
      if (sidebar) {
        this.scroll  = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //var offsetTop = document.querySelector('#searchBar').offsetTop;
        if(this.scroll <= this.topHeight){
          sidebar.style.top =  this.topHeight - this.scroll + 'px';
        }else{
          sidebar.style.top = '0px';
        }
      }
*/
      let tabTabs = document.getElementsByClassName('TabTabs')[0];
      let tabTabsTitle = tabTabs.getElementsByClassName('van-tabs__wrap')[0];
      //console.log(tabTabsTitle);

      if (tabTabs) {
        let tabTabsTitle = tabTabs.getElementsByClassName('van-tabs__wrap')[0];
        //console.log(tabTabsTitle);

        this.scroll  = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //var offsetTop = document.querySelector('#searchBar').offsetTop;
        if(this.scroll <= 100){
          tabTabsTitle.style.position='fixed';
          tabTabsTitle.style.top= '0px';
          tabTabsTitle.style.left= '0px';
        }else{
          tabTabsTitle.style.position='';
          tabTabsTitle.style.top= '';
          tabTabsTitle.style.left= '';
        }
      }


    },
    classFilter(){ // 路由切换
      if (this.$route.path == '/Category') {
        this.$router.push({
          name: '商品分类',
          params: {'className': this.classList[0].cname}
        })
        console.log(this.classList[0].cname);
      } else {
        this.routeClassName = this.$route.params.className;
        this.$router.push({
          name: '商品分类',
          params: {'className': this.routeClassName}
        })
        console.log(this.routeClassName);
        //console.log(this.classList[0].cname);
      }
      // 路由切换 end
    },
    onClickTabs(name, title){
      // console.log('tabsActive:'+this.tabsActive);
      // console.log('name:'+name, 'title:'+title);
    }

  }
}
</script>

<style lang="less" >
.category {
  position: relative;
  .bottomPic{
    width: 100%;
    height: 150px;
    overflow: hidden;
    /*position: fixed;*/
    img{
      width: 100%;
    }
  }
  .tabTabs{
    .van-sticky{
      .van-tabs__nav{
        color: #f00;
        background-color: #f8f4e5;
        padding-top: 2px;
        .van-tab--active{
          color: #f00;
          background-color: #fff;
        }
      }

    }
  }
}
</style>
