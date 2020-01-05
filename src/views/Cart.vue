<template>
  <div class="cart">

    <v-navbar/>

    <v-default-address :defaultAddress="defaultAddress"/>
    <van-checkbox-group class="card-goods" v-model="checkedGoods"  v-if="carList">

      <van-checkbox
        class="card-goods__item"
        v-if="carList"
        v-for="(item,i) in carList"
        :key="i"
        :name="item.time"
      >
        <van-card
          :title="item.title"
          :desc="JSON.stringify(item.selectedParameter)"
          :num="item.num"
          :price="formatPrice(item.price)"
          :thumb="imgPath.imgSmall+item.thumb"
        >
          <div slot="footer">
            <van-button size="mini" type="danger">选择</van-button>
            <van-button size="mini" @click="onDelete(i)">删除</van-button>
          </div>
        </van-card>
      </van-checkbox>

    </van-checkbox-group>
    <v-nothing v-else/>
    <v-divider/>

    <van-submit-bar
      :price="totalPrice * 100"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    >

      <span slot="tip" v-if="defaultAddress" >
        收货地址：<em v-text="defaultAddress.addrDetail"></em>, 
        <!-- <router-link to="/Home">修改地址</router-link> -->
        <router-link to="/Address">修改地址</router-link>
      </span>
      <span slot="tip" v-else>
        你还没有收货地址, <router-link to="/AddressAdd">添加地址</router-link>
      </span>

    </van-submit-bar>
  </div>
</template>
<script>
import NavBar from '@/common/navBar/navBar'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';
import defaultAddress from '@/components/cart/defaultAddress.vue'
import Nothing from '@/components/cart/nothing'
import Divider from '@/common/Divider'
export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    'v-navbar': NavBar,
    'v-default-address':defaultAddress,
    'v-nothing':Nothing,
    'v-divider': Divider,
  },
  data() {
    return {
      //checkedGoods: ['1', '2', '3'],
      checkedGoods: [],
      goods: [{
        id: '1',
        title: '进口香蕉',
        desc: '约250g，2根',
        price: 200,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
      }, {
        id: '2',
        title: '陕西蜜梨',
        desc: '约600g',
        price: 690,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
      }, {
        id: '3',
        title: '美国伽力果',
        desc: '约680g/3个',
        price: 2680,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
      }],
      defaultAddress:null,

    };
  },
  watch: {
    '$route' (to, from) {

      console.log('to:'+to.path);
      console.log('from:'+from.path);


      if (to.path != from.path) {
        console.log('重新请求数据！')
        this.getListAddress();
      } else {
        console.log('原来数据信息！')
      }

    },

  },
  computed: {
    count(){
      return this.$store.state.detail.count
    },
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
    carList () {
      return this.$store.state.detail.carList;
    },
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },
    totalPrice() {
      let t = this ;
      //let arrAll = new Array;
      //return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0);
      if (this.carList) {

        t.isSelect();// 商品是否已选

        return this.carList.reduce((total, item) => total + (this.checkedGoods.indexOf(item.time) !== -1 ? item.price * item.num : 0), 0);

      } else {
        return 0;
        console.log('购物车是空！')
      }

    },
  },
  mounted: function() {
    let t = this ;
    t.$nextTick(function() {
      // 初始化先获取购物车商品列表 否则 页面刷新出Bug
      if (this.$store.state.detail.carList == "") {
        this.$store.commit('RESET_CARLIST')
       }
       //console.log(this.carList);
       t.getListAddress(); // 请求收货地址

       // t.isSelect('Initialization');// 商品是否已选

    });
  },
  methods: {
    formatPrice(price) {
      //return (price / 100).toFixed(2);
      return parseFloat(price).toFixed(2);
    },
    onSubmit() { // 提交订单
      if (this.defaultAddress) {

          // 保存+缓存选择的商品 ,在支付页能用到
          this.$store.dispatch('setSelectedList')
          this.$router.push({ name: '支付页' })

          //Toast('需要支付￥'+ this.totalPrice +'元！');
          const toast = Toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            //message: '倒计时 3 秒后跳转！',
            message: '需付￥'+ this.formatPrice(this.totalPrice) +'元！',
            loadingType: 'spinner',
            selector: '#custom-selector'
          });
          let second = 3;
          const timer = setInterval(() => {
            second--;
            if (second) {
              /*
              toast.setData({
                message: `倒计时 ${second} 秒`
              });
              */
              toast.message = `倒计时 ${second} 秒`;
            } else {
              clearInterval(timer);
              Toast.clear();
            }
          }, 1000);
      } else {
        Toast.fail('还没添加地址！');
      }
    },
    onDelete(i){
      // 点击垃圾桶，删除当前商品，这里用splice和filter都会bug,只能重置数组
      let newCarList = [];
      for (let k = 0; k < this.carList.length; k++) {
        if (k !== i) {
          newCarList.push(this.carList[k])
        }
      }
      //点击垃圾桶 把商品数量count-1
      this.$store.dispatch('setLocalCount', false);
      this.$store.dispatch('cutCarList', newCarList);
      console.log('删除！');
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
        //console.log(t.defaultAddress);
      }).catch(function(error) {
        console.log(error)
      })
    },
    isSelect(init){ // 商品是否已选 ，有参数表示初始化

      let t = this , allPro = new Array , sel = new Array , unSel = new Array , checkStr;
      for (var i = 0; i < this.carList.length; i++) {
        allPro.push(this.carList[i]);
      }

      // 将选择出来的数组转换成字符串，循环出结果，有找到的就true 没则为false
      checkStr = this.checkedGoods.join('');
      for (var i = 0; i < allPro.length; i++) {
        if (checkStr.indexOf(allPro[i].time) >= 0) {
          allPro[i].choseBool = true;
          sel.push(allPro[i]);
        } else {
          allPro[i].choseBool = false;
          unSel.push(allPro[i]);
        }
      }

      // 每次点击选择时都会更改数据
      this.$store.dispatch('cutCarList', allPro);
      //console.log(this.carList);
      //console.log(sel);
      //console.log(unSel);

    },

    onToggle(i){

      // 每点击一下都会改变choseBool的布尔值,所以要重置数组
      this.$nextTick(() => {
        this.$store.dispatch('cutCarList', this.carList);
        console.log(i);
        console.log(this.$store.state.detail.carList);
      })
      console.log('当绑定值变化时触发的事件');
    },
  }
};
</script>

<style lang="less">
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;
    border-bottom: 1px solid #eaeaea;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
</style>
