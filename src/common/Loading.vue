<template lang="html">
  <div class="loading">
    <van-loading size="30px" color="#ffffff">加载中...</van-loading>
    <van-overlay
      :show="show"
      @click="show = false"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading , Overlay  } from 'vant';
Vue.use(Loading);
Vue.use(Overlay);
export default {
  data() {
    return {
      show: true,
    }
  }
}
</script>

<style lang="less" scoped>

.loading {
  position: fixed;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  .van-loading{
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);

    z-index: 30000!important;
  }
  .van-overlay{
    position: fixed;
    z-index: 20000!important;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
  }  
}



</style>
