<template>
  <div class="swipe">
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item v-for="(k, index) in adv_list" :key="index">
        <a :href='k.url_ad' target="_blank"><van-image lazy-load fit="cover" :src="imgPath.imgAdv + k.img_ad" /></a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem ,Image  , Lazyload } from 'vant';
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Image); //Image 图片
export default {
  data () {
    return {
      images: [
        'https://www.apple.com/v/iphone-11-pro/a/images/overview/water-resistance/splashes__d3a02nzl9p4y_large.jpg',
        'https://www.apple.com/v/iphone/home/ab/images/overview/help-choose/compare_family__fbsuhz3gvqai_large.jpg',
        'https://www.apple.com/v/iphone-11-pro/a/images/overview/camera/night_mode_hero__bhkljycv3v36_large.jpg',
        'https://www.apple.com/v/iphone-11-pro/a/images/overview/galleries/ultra-wide-gallery/photo_2__cjlq3zsvyf9e_large.jpg',
        'https://www.apple.com/v/iphone-11-pro/a/images/overview/camera/camera_fov_ultrawide__e4xq1jl1q76u_large.jpg'
      ],
    }
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
    adv_list () { // 广告列表
      return this.$store.state.category.advertisement
    },
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        //console.log(t.adv_list);
      });
  },
  methods:{
    onChange(index) {
      //console.log('当前 Swipe 索引：' + index);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../assets/css/fz.less';
.swipe{

background: -webkit-linear-gradient(115deg, #d253b1, #fb6f4a);
background: linear-gradient(-25deg, #d253b1, #fb6f4a);

  .van-swipe-item{
    max-height: 180px!important;
    overflow: hidden;
    /*.pic_centered_box();*/
    img{
      width: 100%;
      /*.pic_centered_img();*/
    }
  }
}
</style>
