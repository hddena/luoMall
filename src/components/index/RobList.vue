<template>
  <section class="robList">

    <van-divider v-if="title">
      {{title}}&nbsp;-&nbsp;
        <van-count-down
          :time="time"
          format="DD 天 HH 时 mm 分 ss 秒"
        />
    </van-divider>

    <swiper ref="awesomeSwiperA" :options="swiperOptionA" @set-translate="onSetTranslate">
      <!-- slides -->
      <swiper-slide v-for="(k,i) in proLists" :key="i" v-if="proLists && i < num " :to=" {name:'商品详情' , params:{pid:k.pid}}">
        <router-link :to=" {name:'商品详情' , params:{pid:k.pid}}">
          <van-image lazy-load fit="cover" :src="imgPath.imgBig + k.pimg[0]" />
          <div class="product-info">
            <h3 class="itemTitle">{{k.pname}}&nbsp;&nbsp;&nbsp;<van-tag plain type="danger">{{k.cname}}</van-tag></h3>
            <!-- <p><span class="itemPrice">{{k.price_purchase}}</span>&nbsp;&nbsp;&nbsp;<van-icon name="cart-o" /></p> -->
            <div class="itemContent">
                <van-icon name="clock-o" />
                <span v-text="'¥'+k.price_purchase"></span>
                <strike v-text="'¥'+k.price_purchase * 1.2"></strike>
                <!-- <van-button type="danger" size="mini" icon="cart-o">马上抢</van-button> -->
            </div>

          </div>
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

import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

import { Button } from 'vant';
Vue.use(Button);

import { Tag } from 'vant';
Vue.use(Tag);

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
        slidesPerView: 1,
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
    time:null,
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
.robList {
  background-color:#f65960;
  padding: 3px;
  .van-divider{
    color: #fff;width: 80%;margin: 5px auto; font-weight: bolder;font-size: 150%;
    .van-count-down{
      color:#fff;
    }
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
            max-height: 200px;
            width: 96%;
            margin: 2%;
          }
        }
        .product-info{
          width: 100%;
          line-height: 200%;
          text-align: center;
          color:#2c3e50;
          font-size:120%;
          .itemTitle{
            font-weight: bolder;
            border-bottom: 1px solid #e0e0e0;
            width: 90%;
            margin: 0px auto;
          }
          .itemContent{
            > span , > i{
              color:#f00;
            }
            > span{
              font-size: 120%;
              margin-right: 10px;
            }
            padding:2% 0;
            strike{
              color:#a2a2a2;
              font-size:90%;
            }
            button{
              padding:0 5px;
            }
          }
          .itemPrice{
            color:#f00;
            font-size:120%;
            padding: 10px 30px;
          }
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
