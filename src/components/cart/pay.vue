<template lang="html">
  <div class="pay">
    <v-navbar/>
    <div class="pay-address">

      <div v-if="defaultAddress">
        <p class="main-address-per">收货人:<span v-text="defaultAddress.trueName"></span></p>
        <p class="main-address-tel" v-text="defaultAddress.mobile">15985698749</p>
      </div>
      <div v-else>暂无地址</div>

      <p>收货地址:<span v-text="defaultAddress.addrDetail"></span></p>
    </div>
    <div class="pay-product">
      <ul v-if="!confirm">
        <li v-for="k in carList">
          <a>
            <!-- <img :src="k.imgPath" alt=""> -->
            <!-- <van-image lazy-load fit="cover" src="https://www.apple.com/v/iphone-11-pro/a/images/overview/camera/night_mode_hero__bhkljycv3v36_large.jpg" /> -->
            <van-image lazy-load fit="cover" :src="imgPath.imgSmall + k.thumb" />
            <div>
              <h2 style="color:#ee7150"> - {{k.title}} - </h2>
              <h3>数量：{{k.num}} </h3>
              <h3 v-if="k.selectedParameter == '{}' || k.selectedParameter == undefined "><span>本商品没有参数！</span></h3>
              <h3 v-else-if="k.selectedParameter == '本商品没有参数！' "><span>本商品没有参数！</span></h3>
              <h3 v-else><span v-for = "(kk,ii) in k.selectedParameter">{{ii}}:{{kk}}</span></h3>
              <p>单价：{{k.price}} 元</p>
            </div>
          </a>
        </li>
      </ul>
      <!-- 支付成功后的提示 -->
      <div class="pay-confirm" v-else>
        支付成功!!!</br>
        当页面数据清空</br>
        购物车列表重新设置
      </div>
    </div>
    <h3 class="pay-allpay">总需要支付 : <i>￥</i><span>{{allpay}}</span></h3>
    <footer class="pay-footer" ontouchstrat="" @click="payConfirm">
      <span>立即支付</span>
    </footer>
  </div>
</template>
<script>
import Util from '../../util/common'
import NavBar from '@/common/NavBar'
import Vue from 'vue';
import { Dialog } from 'vant';
// 全局注册
Vue.use(Dialog);
export default {
  components: {
    'v-navbar': NavBar,
    [Dialog.Component.name]: Dialog.Component
  },
  data () {
    return {
      confirm: '',
      defaultAddress:{},

      pros: '',
    }
  },
  computed: {
    //所有商品列表
    carList () {
      return this.$store.state.detail.selectedList
    },
    // 商品价格总和
    allpay () {
      let allpay = 0, selectedList = this.carList
      for (let i = 0; i < selectedList.length; i++) {
        allpay += selectedList[i].price * selectedList[i].num
      }
      return allpay
    },
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
  },
  mounted () {
    let t = this;
    // 防止页面刷新后数据丢失
    if (this.$store.state.detail.selectedList == '') {
      this.$store.commit('SET_SELECTEDLIST')
    }

    t.getListAddress(); // 请求收货地址
    t.localSelectedList(); // 获取本地selectedList数据

  },
  methods: {
    localSelectedList () {
      let t = this;
      if (Util.getLocal('selectedList')) {
        let selectedList = Util.getLocal('selectedList');
        //t.pros = [];
        for (var i = 0; i < selectedList.length; i++) {
/*
          let sp ;
          if (JSON.stringify(selectedList[i].selectedParameter) == '{}' || selectedList[i].selectedParameter == "本商品没有参数！" ) {
            console.log(JSON.stringify(selectedList[i].selectedParameter) == '{}');
            console.log(selectedList[i].selectedParameter == "本商品没有参数！");
          } else {
            sp = selectedList[i].selectedParameter;
          }
*/
          console.log(JSON.stringify(selectedList[i].selectedParameter) == '{}');
          console.log(selectedList[i].selectedParameter == "本商品没有参数！");
          if (i == 0) {
            t.pros += selectedList[i].id;
            t.pros += '///';
            t.pros += selectedList[i].num;
            t.pros += '///';
            //t.pros += JSON.stringify(selectedList[i].selectedParameter).replace(/"/g,"");
            if (JSON.stringify(selectedList[i].selectedParameter) != '{}' && selectedList[i].selectedParameter != "本商品没有参数！" ) {
              t.pros += JSON.stringify(selectedList[i].selectedParameter);
            }

          }else{
            t.pros += '|||';
            t.pros += selectedList[i].id;
            t.pros += '///';
            t.pros += selectedList[i].num;
            t.pros += '///';
            if (JSON.stringify(selectedList[i].selectedParameter) != '{}' && selectedList[i].selectedParameter != "本商品没有参数！" ) {
              t.pros += JSON.stringify(selectedList[i].selectedParameter);
            }
          }
        }
        console.log(selectedList);
        console.log(t.pros);
      } else {
        console.log('selectedList 没有数据！');
      }
    },
    payConfirm () {
      let t = this;
      if (this.carList) { //还未提交了订单,数据还未清空
          Dialog.confirm({
            title:'提示',
            message:`确定支付¥${this.allpay}元`
          }).then(() => { //点击成功执行这里的函数

            this.confirm = false;
            this.$store.commit('SET_LOADING', true);
            this.$store.dispatch('resetCarList'); //重置购物车（用unSelectedList替换）
            this.$store.dispatch('resetCount'); //重置购物车数量
            setTimeout(() => {
              this.$store.commit('SET_LOADING', false); //关闭loading
              this.confirm = true; //支付完成后切换视图
            }, 300)

            t.addorder();// 添加订单（会员） 提交订单（会员） 
            console.log('用户支付成功！');

          }).catch(() => {
            //点击取消执行这里的函数
            console.log('用户点击取消按钮！');
          });
      } else { //提交了订单,数据清空
        alert('请勿重复提交订单')
      }
    },
    getListAddress(){  // 获取发货列表（会员）
      //let paramsB = qs('id:41')
      let t = this;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getListAddress',
      }).then((response) => {
        for (var i = 0; i < response.data.data.length; i++) {
          if(response.data.data[i].isDefault == 1){
            t.defaultAddress = response.data.data[i];
            break;
          }
        }
        if (t.defaultAddress == null) {
            Toast.fail('您地址有误！');
        }
        // console.log(t.defaultAddress);
      }).catch(function(error) {
        console.log(error)
      })
    },
    addorder(){ // 添加订单（会员）
      //let paramsB = qs('id:41')
      let t = this;
      let url = '/api/member/addorder';
      let params = {pros:this.pros,addrID:this.defaultAddress.addrID}
      // console.log('addorder'+'_localStorage:假')
      t.$dataApi({
        //headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: url,
        data: params,
        //params: params
      }).then((response) => {
        console.log(response);
        //Util.setLocal(response.data.data , 'addorder' )
        //console.log(t.listAddress);
      }).catch(function(error) {
        console.log(error)
      })
      //console.log(this.listAddress);
    },
  }
}
</script>

<style lang="less" >
.pay {
  width: 100%;
  background-color: #f7f7f7;
  .pay-address {
    background-color: #fff;
    border-bottom: 1 * 10vw/75 solid #dedede;
    padding: 30 * 10vw/75;
    > div {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: space-between;
      p {
        color: #868686;
      }
    }
    > p {
      color: #868686;
      padding-top: 30 * 10vw/75;
      letter-spacing: 3 * 10vw/75;
      line-height: 45 * 10vw/75;
    }
  }
  .pay-product {
    background-color: #fff;
    height: 60vw;
    overflow: auto;
    li {
      a {
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        box-sizing: border-box;
        padding: 20 * 10vw/75 30 * 10vw/75;
        color: #4d4d4d;
        border-bottom: 1 * 10vw/75 solid #dedede;
        > img , .van-image img{
          display: block;
          width: 2.5 * 10vw;
          height: 2.5 * 10vw;
          border: 1px solid #dedede;
        }

        > div {
          box-sizing: border-box;
          padding-left: 50 * 10vw/75;
          width: 70%;
          h2 {
            padding-top: 0.09 * 10vw;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          h3 {
            text-align: left;
            padding-top: 2vw;
          }p {
            text-align: right;
            padding-top: 1 * 5vw;
          }
        }
      }
    }
  }
  .pay-allpay {
    text-align: right;
    margin-top: 6vw;
    padding: 4vw 5vw;
    color: #999999;
    background-color: #fff;
    i,
    span {
      color: #f00;
    }
  }
  .pay-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 4vw;
    span {
      display: block;
      width: 85%;
      background-color: #fd729c;
      border-radius: 1.3vw;
      color: #fff;
      font-size: 17px;
      padding: 4vw;
      margin: 0 auto;
      text-align: center;
      &:active {
        background-color: #f00;
      }
    }
  }
  .pay-confirm {
    padding: 20px 0;
    background-color: #f00;
    text-align: center;
    color: #fff;
    line-height: 30px;
  }
}
</style>