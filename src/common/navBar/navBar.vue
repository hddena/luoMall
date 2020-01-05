<template lang="html">
  <div class="navBar">

    <van-nav-bar title="美折购" left-text="" left-arrow v-if="$route.name == '首页' ">
        <div slot="right">
          <v-slot-right/>
        </div>
    </van-nav-bar>

     <van-nav-bar :title="$route.name" left-text="返回" @click-left="onClickLeft" left-arrow v-else>
        <div slot="right">
          <v-slot-right/>
        </div>
    </van-nav-bar>

  </div>
</template>
<script>
import slotRight from './slotRight';
import Vue from 'vue';
import { NavBar , Toast  } from 'vant';
Vue.use(NavBar); //NavBar 导航栏

export default {
  data() {
    return {
      active:0,
    }
  },
  components:{
    'v-slot-right': slotRight
  },
  computed: {
    userInfoFn () {
      return this.$store.state.login.userInfo
    },
  },
  mounted: function() {
      let t = this;
      t.$nextTick(function() {
          //t.getClassList(); //产品类别列表
          t.modifyIcon() // 修改首页顶部箭头图标
          // ßconsole.log(this.routerPath);
      });
  },
  methods: {
    modifyIcon(){ // 修改首页顶部箭头图标
      if (this.$route.name == '首页' ) {
        let iconLeft = document.getElementsByClassName('van-icon-arrow-left')[0];
        if (iconLeft) {
          iconLeft.className= 'van-icon van-icon-wap-home-o van-button__icon homeIcon';
          //console.log(iconLeft);
        }
      }
    },
    onClickLeft() {
      //Toast('返回');
      //console.log('返回'+this.$router);
      console.log(this.$router);
      this.$router.go(-1);
    },
    goToUser() {
      //Toast('按钮');
      this.$router.replace({
        //path: 'login'
        path: '/User'
      })
    },

  }
}
</script>

<style lang="less" scoped>
.navBar{
  border-bottom: 1px solid #d7d7d7;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.12);
  .van-nav-bar__left{
    .van-nav-bar__text{
      font-size: 100%;
    }
  }
  .van-nav-bar__right{right:0px;}
}
.homeIcon{
  font-size: 150%;
  color: #f00;
}
</style>
