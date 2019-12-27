<template>
  <div class="footer">
    <van-goods-action>
      <van-goods-action-icon icon="home-o" text="首页"  @click="goHome"/>
      <van-goods-action-icon icon="chat-o" text="客服" @click="kefu"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickCart" :info="count"/>
      <van-goods-action-button type="warning" @click="addIntoCar">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="onBuy">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
    <van-dialog
      v-model="showDialog"
      :title="goods.title"
      show-cancel-button
      @confirm="onConfirm"
    >
      <div class="pic" v-if="goods"><img :src="imgPath.imgMiddle + goods.pimg[0]"></div>

      <div class="content">
        <span v-if="this.$store.state.detail.selectedParameter">己选</span>
        <p v-if="this.$store.state.detail.selectedParameter">{{JSON.stringify(this.$store.state.detail.selectedParameter).replace(/"/g,"").replace(/,/g,"，").replace(/{/g,"").replace(/}/g,"")}}</p>
        <span>数量：{{this.$store.state.detail.numValue}}</span>
      </div>

    </van-dialog>
  </div>
</template>
<script>
import Util from '../../util/common.js'
import Vue from 'vue';
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Toast,
  Dialog
} from 'vant';
Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Toast)
  .use(Dialog);
export default {
  data() {
    return {
      showDialog:false,
      addIntoCarProduct:[],
    };
  },
  props: {
    goods: {
        type: Object,
        default: () => {}
    },
    parameter: {
        type: Object,
        default: () => {}
    },
    num:null
  },
  watch: {
    goods(newValue,oldValue){
      console.log(newValue,oldValue);
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
    count () {
      //页面刷新后 数据会消失,解决:加判断
      if (this.$store.state.detail.count == '') {
        this.$store.commit('CHANGE_COUNT');
      }
      return this.$store.state.detail.count
    },
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        //console.log(this.$route);
        console.log(this.$store.state.detail.selectedParameter);
        //console.log(Util.getLocal( 'parameter' ));
      });
  },
  methods: {
    addIntoCar () {
      console.log(this.$store.state.detail.selectedParameter == true);
      console.log(this.$store.state.detail.selectedParameter);
      if (this.$store.state.detail.selectedParameter && this.goods.properties) {
      const product = [{
        id: this.goods.pid,
        title: this.goods.title,
        selectedParameter:this.$store.state.detail.selectedParameter,
        num:this.$store.state.detail.numValue,
        price: this.$store.state.detail.defaultPrice,
        thumb: this.goods.pimg[0],
        time:new Date(),
        choseBool: false
      }];
      this.addIntoCarProduct = product;
      this.showDialog = true;
      } else if(this.goods.properties == '' ||this.goods.properties == undefined ||this.goods.properties == null){
        const product = [{
          id: this.goods.pid,
          title: this.goods.title,
          selectedParameter:'本商品没有参数！',
          num:this.$store.state.detail.numValue,
          price: this.goods.price_agent,
          thumb: this.goods.pimg[0],
          time:new Date(),
          choseBool: false
        }];
        this.addIntoCarProduct = product;
        this.showDialog = true;
      }else{
        Toast.fail('参数未选！');
      }

      
    },
    onConfirm(){
      var t = this;
      return new Promise(function(resolve, reject) {
        resolve('OK');
      })
      .then(action => {
          //点击成功执行这里的函数
          console.log(t.addIntoCarProduct);
          this.$store.dispatch('setLocalCount', true);
          this.$store.dispatch('addCarList', t.addIntoCarProduct);
          Toast({
            message: '添加成功',
            duration: 1000
          });
        })
      .catch(function(error) {
        console.log(error)
      })
    },
    kefu(){
      window.open("tel:13570859899");
    },
    onBuy(){ 
      //console.log('showSku 显示状态');
      this.$router.push('/cart');
      //this.showState = true;
    },
    goHome() {
      this.$router.push('/');
    },
    onClickCart() {
      this.$router.push('/cart');
    },
    sorry() {
      Toast('暂无后续逻辑~');
    },
  }
};
</script>
<style lang="less">
.footer {
  .van-dialog__content{
    padding:10px;
    .pic{
      width:100%;
      text-align: center;
      img{
        width:80%;
        max-height: 300px;
        padding:10px 0px;
        object-fit: contain;
      }
    }
    .content{
      border-top:1px solid #666;
      padding-top:10px;
      span{
        font-weight: bold;
        color:#f00;
      }
      p{
        padding:10px 0px;
      }
    }
  }
}
</style>