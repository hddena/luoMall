<template>
  <section class="proLists">
    <van-divider v-if="title">
      <van-icon name="apps-o" />
      <span v-text="title"></span>
    </van-divider>
    <van-grid :border="false" :column-num="Number(colNum)" :gutter="10">
      <van-grid-item v-for="(k,i) in proLists" :key="i" v-if="proLists && i < num" :to=" {name:'商品详情' , params:{pid:k.pid}}" >

        <van-image lazy-load fit="cover" :src="imgPath.imgBig + k.pimg[0]" v-if="Number(colNum) < 2"/>
        <van-image lazy-load fit="cover" :src="imgPath.imgSmall + k.pimg[0]" v-else/>

        <h3>{{k.pname}}</h3>
        <p v-if="$store.state.login.userInfo">
          <span v-if="$store.state.login.userInfo.userType ==2">{{k.price_agent | moneyFormat}}</span>
          <span v-else if="$store.state.login.userInfo.userType ==3">{{k.price_company | moneyFormat}}</span>
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
import Util from '../util/common.js'
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
    colNum:null, //每行显示个数
  },
  watch: {

/*
    proLists (newValue,oldValue){ // 商品列表
      let val;
      if (newValue) {
        val = newValue;
      } else {
        val = oldValue;
      }
      console.log(val);
      if (val) {
        if (typeof val[0].pimg === "string") { // 如果当前 val 中的图片等于 string 就证明 当前值没有转换成数组需要转换
          // console.log(val[0].pimg);
          for (var i = 0; i < val.length; i++) {
            if(typeof val[i].pimg !== 'string'){ // value不是string类型的值时需要转换
               val[i].pimg = val[i].pimg.toString();
            }
            val[i].pimg = val[i].pimg.split(',');
            // console.log(this.colNum);

            if (this.colNum == 1) {
              for (var y = 0; y < val[i].pimg.length; y++) {
                val[i].pimg[y] = this.$store.state.category.imgPath.imgBig + val[i].pimg[y];
                //console.log('不完整！');
              }
            } else {
              for (var y = 0; y < val[i].pimg.length; y++) {
                // console.log(typeof Number(val[i].pimg[y]));
                console.log(val[i].pimg[y].indexOf('http'));
                if (val[i].pimg[y].indexOf('http') > 0) {
                  console.log(val[i].pimg[y].indexOf('http'));
                } else{
                val[i].pimg[y] = this.$store.state.category.imgPath.imgMiddle + val[i].pimg[y];
                //console.log('不完整！');
                }



              }
            }

          }
        }
      }
    },
    */
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        // console.log(typeof t.colNum);
      });
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.van-image{width: 100%;height: 100%;min-height: 120px;}
.van-image img{
  max-height: 180px;
  object-fit: cover;
}
.search .proLists {
    /*margin-top: 10px;*/
}
.proLists .van-divider{
    color: #f00;width: 80%;margin: 5px auto;font-size: 120%;font-weight: bolder;
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
    line-height: 150%;
    font-size: 12px;
    margin-top:2%;
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
