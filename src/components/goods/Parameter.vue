<template>
  <div class="parameter" v-if="parameter">
    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.pname }} || {{ goods.cname }}</div>
        <div class="goods-price">
            <!-- 有会员信息、有选参数、默认价格变成数组的情况下才会显示以下信息 -->
            <p v-if="userInfo && selectArr.length ">
              <span v-if='userInfo.userType == 3'>分公司价格：{{defaultPrice}}</span>
              <span v-else-if='userInfo.userType == 2'>代理价格：{{defaultPrice}}</span>
              <span v-else>会员价格：{{defaultPrice}}</span>
            </p>
            <p v-else>
              <span >价格：{{defaultPrice}}</span>
            </p>
            <span class="stepper"><van-stepper v-model="numvalue" integer @change="onChangeNum"/></span>
        </div>
      </van-cell>
      <van-cell>
        <h3 class="title" v-if="goods.properties == '' ||goods.properties == '{}' ">当前商品没可选参数</h3>
        <h3 class="title" @click="showParameterState" v-else-if="selectArr.length">己选：<span v-for="(k,i) in this.$store.state.detail.selectedParameter">{{i}}-{{k}}，</span></h3>
        <h3 class="title" @click="showParameterState" v-else>请选择参数</h3>
        <!-- <h1 class="title" @click="showParameterState" >本商品暂无参数</h1> -->
        <!-- <h2>H2:{{this.$store.state.detail.selectedParameter}}</h2> -->
      </van-cell>
    </van-cell-group>
    <van-popup
      v-model="showState"
      closeable
      position="bottom"
      :style="{ height: '50%' }"
      @close="onClose"
    >
    <div class="productBox">
        <div class="productConten">
            <div class="product-delcom">
              <div class="product-pic">
                <van-image lazy-load fit="cover" :src="imgPath.imgSmall + goods.pimg[0]" />
                <!-- <van-icon name="photo-o" /> -->
              </div>

              <!-- 有会员信息、有选参数、默认价格变成数组的情况下才会显示以下信息 -->
              <h4 class="product-price" v-if="userInfo && selectArr.length ">
                <span v-if='userInfo.userType == 3'>分公司价格：{{defaultPrice}}</span>
                <span v-else-if='userInfo.userType == 2'>代理价格：{{defaultPrice}}</span>
                <span v-else>会员价格：{{defaultPrice}}</span>
              </h4>
              <h4 class="product-price" v-else>
                <span>价格：{{defaultPrice}}</span>
              </h4>
              <h4 class="product-parameter" v-if="selectArr.length">商品参数:{{selectArr}}</h4>
              <h4 class="product-parameter" v-else>请选择商品参数</h4>
              <span class="stepper"><van-stepper v-model="numvalue" integer /></span>
            </div>
            <div class="product-delcom" v-for="(ProductItem,n) in simulatedDATA.specifications" v-if='ProductItem.item[0].name'>
                <p>{{ProductItem.name}}</p>
                <ul class="product-footerlist clearfix">
                    <li v-for="(oItem,index) in ProductItem.item" v-on:click="specificationBtn(oItem.name,n,$event,index)" v-bind:class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">{{oItem.name}}</li>
                </ul>
            </div>
        </div>

        <!-- <div class="product-footer" v-on:click = "onClose"> -->
          <div class="product-footer" v-on:click = "showState = false">
            <a href="javascript:">确定</a>
        </div>
        
    </div>
    </van-popup>
  </div>
</template>
<script>
import Util from '../../util/common.js'
import Vue from 'vue';
import { Toast , Stepper } from 'vant';
Vue.use(Toast);
Vue.use(Stepper);
export default {
  data() {
    return {
        showState:false,
        numvalue:1,
        simulatedDATA: { //模拟后台返回的数据 多规格
            "difference": [],//所有的规格可能情况都在这个数组里
            "specifications": [] //这里是要被渲染字段
        },
        defaultPrice: 88888, //默认价格
        selectArr: [], //存放被选中的值
        shopItemInfo: {}, //存放要和选中的值进行匹配的数据
        subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断

        roblistShow:false, // 是否在抢购时间内
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
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('to:'+to.path);
      console.log('from:'+from.path);
    },
    goods(newValue,oldValue){
      //console.log(newValue,oldValue);
      if (newValue) {
        this.initialData(newValue);
      } else {
        this.initialData(oldValue);
      }
   },
    parameter(newValue,oldValue){
      //console.log(newValue,oldValue);
   },
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
    userInfo () { // 图片地址
      return this.$store.state.login.userInfo
    },
    // this.$store.commit('commit', this.orderParameter);
    // dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('action方法名',值)
    // commit：同步操作，写法：this.$store.commit('mutations方法名',值)
  },
  created: function () {
      var self = this;
      for (var i in self.simulatedDATA.difference) {
            //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
            self.shopItemInfo[self.simulatedDATA.difference[i].difference] = self.simulatedDATA.difference[i];
      }
      self.checkItem();
  },
  mounted: function() {
      let self = this ;
      self.$nextTick(function() {
        //console.log(self.simulatedDATA.difference);
        //this.initialData(this.goods);
        
        this.$store.commit('CHANGE_SET_PARAMETER',null); //初始化清空商品参数
        this.$store.commit('RPO_SET_NUM',this.numvalue); //初始化商品数量

        this.getPurDateTime () ; // 抢购时间范围 ， 时间差
      });
  },
  methods: {
    showParameterState(){ //showSku 显示状态
      this.showState = true;
    },
    onChangeNum(){
      this.$store.commit('RPO_SET_NUM',this.numvalue);
    },
    onClose(){
      if (this.parameterIsAll()) { // 参数是否全选？
        //Toast.success('己选：' + this.selectArr);
        //Toast('己选：' + this.selectArr);
        Toast('己选：' + JSON.stringify(this.$store.state.detail.selectedParameter).replace(/{/g,"").replace(/}/g,""));
      } else{
        Toast.fail('参数未选齐！');
      }
    },
    specificationBtn (item, n, event, index) {
        var self = this;
        if (self.selectArr[n] != item) {
            self.selectArr[n] = item;
            self.subIndex[n] = index;
        } else {
            self.selectArr[n] = "";
            self.subIndex[n] = -1; //去掉选中的颜色 
        }
        //修改默认价格
        self.defaultPriceFn();
        self.checkItem();
    },
    checkItem () {
        var self = this;
        var option = self.simulatedDATA.specifications;
        var result = [];  //定义数组存储被选中的值
        for (var i in option) {
            result[i] = self.selectArr[i] ? self.selectArr[i] : '';
        }
        for (var i in option) {
            var last = result[i];  //把选中的值存放到字符串last去
            for (var k in option[i].item) {
                result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
                option[i].item[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
            }
            result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
        }
        self.$forceUpdate(); //重绘

        if ( self.parameterIsAll() && self.goods.properties || self.goods.properties == '{}') { // 参数是否全选？
          console.log('参数已全！');

          let JSONproperties = JSON.parse(this.goods.properties);
          let j , obj = new Object , arr = new Array;
          for(j in JSONproperties){
            arr.push(j); //key
          }
          for (var i = 0; i < arr.length; i++) {
            //arr[i]=arr[i] +':'+this.selectArr[i];
            obj[arr[i]]= this.selectArr[i];
          }
          this.$store.commit('CHANGE_SET_PARAMETER',obj);
          const product = [{
            id: this.goods.pid,
            title: this.goods.title,
            selectedParameter:this.$store.state.detail.selectedParameter,
            num:this.numvalue,
            price: this.$store.state.detail.defaultPrice,
            thumb: this.goods.pimg[0],
            time:new Date(),
            choseBool: false
          }];
          console.log(product);
          console.log(this.$store.state.detail.selectedParameter);

        } else {
          console.log('参数没先齐！');
        }
    },
    isMay (result) {
        for (var i in result) { 
            if (result[i] == '') {
                return true; //如果数组里有为空的值，那直接返回true
            }
        }
        return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
    },
    parameterIsAll(){ //参数是否已选齐！
        if(this.simulatedDATA.difference[0]){
          let xArr = this.simulatedDATA.difference[0].difference.split(',');
          if(this.selectArr.length == xArr.length){
            for (var i = 0; i < this.selectArr.length; i++) {
              // if (this.selectArr[i] == "" || this.selectArr[i] == null || this.selectArr[i] == undefined) 
              if (this.selectArr[i] == "") {
                //console.log('参数选择有问题',this.selectArr[i]);
                return false;
                break;
              }
            }
          }else{
            //console.log('没选齐参数！')
            return false;
          }
          //console.log('参数已齐！');
        }
        return true;
    },
    // 如果当前商品的属性与属性的组合没有，可以最后的价格填上【888888】则现在的抢购价填上【888888】。
    initialData(val){  // 初始化数据
      //console.log(val.properties);
      let self = this;
      if (val.properties) {  // 先判断当前商品是否有参数再往操作
        let properties = val.properties;
        let obj = JSON.parse(properties); // 将商品参数转为json对象
        for(let index in obj) {
            let formArr = obj[index].split('|');
            let toArr = [];
            for (var y = 0; y < formArr.length; y++) { // 将商品参数添加一个name属性转为json对象
              let formArrVal = {
                name:formArr[y]
              }

              toArr.push(formArrVal);
            }
            const parameter = { 
              name: index,
              item: toArr,
            };
            console.log(parameter);
            this.simulatedDATA.specifications.push(parameter);
        };
        //console.log(this.simulatedDATA.specifications);
      } else {
        console.log('当前商品没有参数！');
      }
      
      if (val.propertiesPrice) {  // 先判断当前商品是否有其它价格再往操作
        let dataPriceStr = val.propertiesPrice;
        let dataPriceJson = JSON.parse(dataPriceStr.replace(/¦/g,",").replace(/,,/g,","));
        let x , lock;
        for ( x in dataPriceJson)
        {
          let priceArr = dataPriceJson[x].split('/');
          //console.log(priceArr);
          for (var i = 0; i < priceArr.length; i++) {
            // console.log(priceArr[i]);
            if (priceArr[i] == 888888 ) { //如果出现这数字为锁定状态,锁定状态为 0 , 跳出for
              lock = 0;
              break;
            } else {
              lock = i;
            }
          }
          //console.log(x.charAt(x.length - 1));
          if (x.charAt(x.length - 1) == ',') { //删除字符串最后一位的字符
            x = x.substring(0,x.length-1)
          }
          //console.log(x);
          const product = {
            id: 100,
            price: priceArr,
            stock: lock,
            difference: x,
          };
          this.simulatedDATA.difference.push(product);
        }
        //console.log(this.simulatedDATA.difference);
      }

      for (var i in self.simulatedDATA.difference) {
          //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
          self.shopItemInfo[self.simulatedDATA.difference[i].difference] = self.simulatedDATA.difference[i]; 
      }
      //console.log(self.shopItemInfo);
      this.checkItem();
      console.log(this.simulatedDATA);
      this.defaultPriceFn();//设置默认价格
    },
    defaultPriceFn(){ //设置默认价格
      let self = this;
      if (self.simulatedDATA.difference.length != 0) {
        for (var i = 0; i < self.simulatedDATA.difference.length; i++) {
            if (self.simulatedDATA.difference[i].difference == self.selectArr) {
                // self.defaultPrice = self.simulatedDATA.difference[i].price;
                //console.log('参数符合修改默认价格！')
                self.judgeUserPriceFn(self.simulatedDATA.difference[i].price);
                break;
            } else {
              self.judgeUserPriceFn();// 判断会员设置默认价格
            }
        }
      } else {
        self.judgeUserPriceFn();// 判断会员设置默认价格
      }
    }, //设置默认价格 end

    judgeUserPriceFn(priceVal){ // 判断会员设置默认价格
      let self = this;
      if (priceVal) {
        if (self.goods.isCanPurchase == 1){
          self.defaultPrice = priceVal[3];
        } else if (this.userInfo) {
          if (this.userInfo.userType == 3) {
            self.defaultPrice = priceVal[2];
          } else if (this.userInfo.userType == 2)  {
            self.defaultPrice = priceVal[1];
          } else {
            self.defaultPrice = priceVal[0];
          }
        } else {
          self.defaultPrice = priceVal[0];
        }
      } else {
        if (self.goods.isCanPurchase == 1){
          self.defaultPrice = this.goods.price_purchase;
        } else if (this.userInfo) {
          if (this.userInfo.userType == 3) {
            self.defaultPrice = this.goods.price_company;
          } else if (this.userInfo.userType == 2)  {
            self.defaultPrice = this.goods.price_agent;
          } else {
            self.defaultPrice = this.goods.price_normal;
          }
        } else {
          self.defaultPrice = this.goods.price_normal;
        }
      }
      this.$store.commit('RPO_SET_PRICE',self.defaultPrice); //设置商品数价格
    }, // 判断会员设置默认价格 end
    getPurDateTime () {  // 抢购时间范围 ， 时间差
      let t = this;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'get',
        url: '/api/product/getPurDateTime',
        params: {
          city:'广州'
        }
      }).then((response) => {
        //console.log(response.data.data);
        // console.log(response.data.data.endTime_purchase.slice(0,10));
        let nowYear = new Date().getFullYear(); // 获取当前年份
        let nowMonth = new Date().getMonth() + 1; // 获取当前月份
        let nowToday = new Date().getDate(); // 获取当前日期
        let nowHour = new Date().getHours(); //获取当前小时
        let nowMinute = new Date().getMinutes(); //获得当前分钟
        let nowSeconds = new Date().getSeconds() //获得当前秒
        let nowTime = nowYear+'-'+nowMonth+'-'+nowToday+' '+nowHour+':'+nowMinute+':'+nowSeconds;
        let beginTime = Util.GetDateDiff(nowTime,response.data.data.beginTime_purchase,"minute");
        let endTime = Util.GetDateDiff(nowTime,response.data.data.endTime_purchase,"minute");
        if (beginTime > 0) { 
          console.log('还没开启抢购！');
          this.roblistShow = false;
          this.timeDiff = 0 ;
        } else if (endTime < 0)  {
          console.log('已经过了抢购时间！');
          this.roblistShow = false;
          this.timeDiff = endTime * 60 * 1000;
        }  else {
          console.log('已开启抢购！');
          this.roblistShow = true;
          this.timeDiff = endTime * 60 * 1000;
        } 
        console.log(beginTime , endTime);
      }).catch(function(error) {
        console.log(error)
      })
    },

  }
};
</script>
<style lang="less">
@parameterColor:#ff3f00;

ol,ul {list-style:none;}
li {list-style-type:none;}
.clearfix:after {display:block;overflow:hidden;clear:both;height:0;visibility:hidden;content:"";}
* {margin:0;padding:0;-webkit-tap-highlight-color:rgba(0,0,0,0);}

@media screen and (max-width:319px) {html {font-size:42.666665px;}
}
@media screen and (min-width:320px) and (max-width:359px) {html {font-size:42.66666px;}
}
@media screen and (min-width:360px) and (max-width:374px) {html {font-size:48px;}
}
@media screen and (min-width:375px) and (max-width:383px) {html {font-size:50px;}
}
@media screen and (min-width:384px) and (max-width:399px) {html {font-size:51.2px;}
}
@media screen and (min-width:400px) and (max-width:413px) {html {font-size:53.333335px;}
}
@media screen and (min-width:414px) {html {font-size:55.2px;}
}
.productBox {position:fixed;bottom:0;left:0;width:100%;background-color:#fff;}
.productConten {margin-bottom:0.5rem;}
.product-delcom {padding:0.24rem 7%;color:#323232;font-size:0.26rem;border-bottom:1px solid #EEEEEE;}
.product-footerlist {margin-top:0.1rem;}
.product-footerlist li {border:1px solid #ff3f00;border-radius:0.08rem;color:#ff3f00;text-align:center;padding:0.04rem 0.16rem;float:left;margin-right:0.16rem;min-width:0.96rem;margin-bottom:0.16rem;}
.product-footerlist li.productActive {background-color:#ff3f00;color:#fff;border:1px solid #ff3f00;}
.product-footerlist li.noneActive {background-color:#ccc;opacity:0.4;color:#000;pointer-events:none;}
.product-footer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex:1;-webkit-box-flex:1;flex:1;background-color:#ff3f00;line-height:1rem;text-align:center;}
.product-footer a {-webkit-flex:1;-webkit-box-flex:1;flex:1;color:#fff;font-size:0.3rem;text-decoration:none;}

.goods-price{
  position: relative;
  .stepper{
    position: absolute;
    top:0px ;
    right:5px;
  }
}
.product-delcom{
  position: relative;
  .stepper{
    position: absolute;
    top:1.3rem ;
    right:1.3rem ;
  }
}
.title{font-size:100%;color:#f00;}
.product-pic{
    width: 80px;
    height: 80px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    position: absolute;
    top: -0.8rem;
    background: #fff;
    padding: .15rem;
    box-shadow: 0 0 1px 1px #f1f1f1;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
}
.product-delcom h4{
  line-height:200%;
  font-size:120%;
  font-weight: bold;
}
.product-price{
  margin-top:1rem;
  color:#f00;
}
</style>
