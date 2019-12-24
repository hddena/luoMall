<template>
    <div class="swiper">
      <van-swipe class="goods-swipe" :autoplay="3000">
        <van-swipe-item v-for="(k,i) in goods.pimg" :key="i">
          <a :href="imgPath.imgBig + k" target="_blank"><img :src="imgPath.imgBig + k" ></a>
        </van-swipe-item>
      </van-swipe>
      <div class="back" @click="$router.go(-1)">
        <van-icon name="arrow-left" />
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Util from '../../util/common.js'

import {
  Icon,
  Swipe,
  Toast,
  SwipeItem,
} from 'vant';

Vue.use(Toast);
export default {

  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,

  },

  data() {
    return {
      skuu: null,
    };
  },
  props: {
    //show: false,  // true , false
    goods: {
        type: Object,
        default: () => {}
    },

  },
  watch: {
    goods(newValue,oldValue){
      console.log(newValue,oldValue);
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
        //console.log(this.$route);

      });
  },
  methods: {
    showSkuState(){ //showSku 显示状态
      this.skuState = true;
    },

  }
};
</script>

<style lang="less">
.swiper {

}
</style>
