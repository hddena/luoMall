<template lang="html">
  <div class="NavBar">
    <van-nav-bar
      :title="$route.name"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

  </div>
</template>
<script>
import Vue from 'vue';
import { NavBar , Toast  } from 'vant';
Vue.use(NavBar); //NavBar 导航栏

export default {
  data() {
    return {
      active:0,
    }
  },
  mounted: function() {
      let t = this;
      t.$nextTick(function() {
          //t.getClassList(); //产品类别列表
      });
  },
  methods: {
    onClickLeft() {
      //Toast('返回');
      //console.log('返回'+this.$router);
      console.log(this.$router);
      this.$router.go(-1);
    },
    onClickRight() {
      //Toast('按钮');
      this.$router.replace({
        //path: 'login'
        path: '/home'
      })
    },

  }
}
</script>

<style lang="less" scoped>
.tabbar{
  .van-tabbar{
    -webkit-box-shadow: 0 -1px 8px rgba(0,1,1,.08);
    box-shadow: 0 -1px 8px rgba(0,1,1,.08);
  }
}
</style>
