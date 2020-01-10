<template>
  <section class="proLists">
    <van-divider v-if="title">{{title}}</van-divider>
    <van-grid :border="false" :column-num="2" :gutter="10" v-if="proLists">
      <van-grid-item v-for="(k,i) in proLists" :key="i" v-if="title == k.cname || title == '全部'" :to=" {name:'商品详情' , params:{pid:k.pid}}" >
        <van-image lazy-load fit="cover" :src="imgPath.imgSmall + k.pimg[0]" />
        <!-- <img src="https://img.yzcdn.cn/vant/apple-1.jpg"> -->
        <h3>{{k.pname}} | {{k.cname}}</h3>
        <!-- <p><span>{{k.price_normal | moneyFormat}}</span><span><van-icon name="cart-circle-o" /></span></p> -->
        <p v-if="$store.state.login.userInfo">
          <span v-if="$store.state.login.userInfo.userType ==2">{{k.price_agent | moneyFormat}}</span>
          <span v-else if="$store.state.login.userInfo.userType == 3">{{k.price_company | moneyFormat}}</span>
          <span v-else>{{k.price_normal | moneyFormat}}</span>
          <span><van-icon name="cart-circle-o" /></span>
        </p>
        <p v-else>
          <span>{{k.price_normal | moneyFormat}}</span>
          <span><van-icon name="cart-circle-o" /></span>
        </p>
      </van-grid-item>
    </van-grid>
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
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: {
    title:null,

    proLists: {
      type: Array,
      default: function () {
        return []
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
      // console.log(val);
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.van-image{width: 100%;height: 100%;}
.van-image img{
  max-height: 180px;
  object-fit: cover;
}
.proLists {
    padding-bottom: 10px;
}
.proLists .van-divider{
    color: #f00;width: 80%;margin: 5px auto;
}
.proLists .van-grid-item__content{
  /*background-color: rgba(0,0,0,0);*/
  padding: 8px!important;
}
.proLists .van-divider:before,.proLists .van-divider:after{
    height: 2px;
    background-color: #f00;
}
.proLists .van-grid-item{
    border-radius: 5px;
    overflow: hidden;
}
.proLists .van-grid-item h3{
    width: 100%;
    line-height: 200%;
    text-align: center;
}
.proLists .van-grid-item p{
    width: 100%;
    line-height: 200%;
    text-align: center;

    display: flex;
    s,strike{
      color:#a2a2a2;
    }
}
.proLists .van-grid-item p span{
    color: #f00;
    font-size: 120%;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    i{
      font-size: 150%;
    }
}
</style>
