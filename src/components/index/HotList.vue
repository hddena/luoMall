<template>
  <section class="hotLists">

    <van-divider v-if="title">{{title}}</van-divider>

    <swiper ref="awesomeSwiperA" :options="swiperOptionA" @set-translate="onSetTranslate">
      <!-- slides -->
      <swiper-slide v-for="(k,i) in proLists" :key="i" v-if="proLists && i < num" :to=" {name:'商品详情' , params:{pid:k.pid}}">
        <router-link :to=" {name:'商品详情' , params:{pid:k.pid}}">
          <van-image lazy-load fit="cover" :src="k.pimg[0]" />
          <h3>{{k.pname}}</h3>
          <!-- <p><span>{{k.price_normal | moneyFormat}}</span><span><van-icon name="cart-circle-o" /></span></p> -->
        </router-link>
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
<!-- 
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
       -->
    </swiper>

<!-- 
    <van-grid :border="false" :column-num="2" :gutter="10">
      <van-grid-item v-for="(k,i) in proLists" :key="i" v-if="proLists && i < num" :to=" {name:'商品详情' , params:{pid:k.pid}}" >
        <van-image lazy-load fit="cover" :src="k.pimg[0]" />
        <h3>{{k.pname}} | {{k.cname}}</h3>
        <p><span>{{k.price_agent | moneyFormat}}</span><span><van-icon name="cart-circle-o" /></span></p>
      </van-grid-item>
    </van-grid>
     -->
  </section>
</template>

<script>
import Vue from 'vue';
import Util from '../../util/common.js'
import { Grid, GridItem , Image ,Divider , Icon  } from 'vant';  //Divider 分割线 Icon 图标
Vue.use(Grid).use(GridItem);
Vue.use(Image);
Vue.use(Divider);
Vue.use(Icon);

Vue.use(VueAwesomeSwiper);
export default {
   components: {
      LocalSwiper: VueAwesomeSwiper.swiper,
      LocalSlide: VueAwesomeSwiper.swiperSlide,
   },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',

     swiperOptionA: {
        slidesPerView: 3,
        spaceBetween: 5,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
     },

    }
  },
  props: {
    title:null,
    proLists: {
      type: Array,
      default: function () {
        return []
        //return Util.shuffle([]);
      }
    },
    num:null,
  },
  watch: {
    proLists (newValue,oldValue){ // 商品列表
      let val;
      if (newValue) {
        val = newValue;
      } else {
        val = oldValue;
      }
      //let shuffleVal = Util.shuffle(val);
      //console.log(shuffleVal[0].pname);
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
        //console.log(t.proLists);
      });
  },
  methods: {
      onSetTranslate() {
        //console.log('onSetTranslate')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.hotLists {
  .van-divider{
    color: #f00;width: 80%;margin: 5px auto;
  }
  .van-divider:before,.van-divider:after{
      height: 2px;
      background-color: #f00;
  }
  .swiper-container{
    .swiper-wrapper{
      .swiper-slide{
        background-color:#fff;
        border:0px solid #fff;
        border-radius: 5px;
        overflow: hidden;
        .van-image {
          img{
            max-height: 180px;
            width: 90%;
            margin: 5%;
          }
        }
        h3{
          width: 100%;
          line-height: 200%;
          text-align: center;
          color:#2c3e50;
        }
        p{
          width: 100%;
          line-height: 200%;
          text-align: center;
          display: flex;
          span{
            color: #f00;
            font-size: 120%;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            i{
              font-size: 150%;
            }
          }  
        }
      }      
    }
    .swiper-pagination{
      display: none;
    }

  }


}




</style>
