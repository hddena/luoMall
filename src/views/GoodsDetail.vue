<template>
  <div class="goods">
    <v-swiper :goods="goods"/>
    <van-cell-group>
      <v-parameter
        :goods='goods'
        :parameter='parameter'
      />
    </van-cell-group>
<!-- 
    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>
 -->
    <van-cell-group class="goods-cell-group">
      <!-- <van-cell title="查看商品详情" is-link @click="sorry" /> -->
      <van-cell title="查看商品详情" />
      <div class="content" v-html="goods.pcontent"></div>
    </van-cell-group>

    <section class="pic">
      <van-image lazy-load fit="fill" src="http://www.jiajujiazhuang.com/images/120907/14060510I-.jpg" />
    </section>
    <v-prolist :proLists='proList' colNum="2" :num='num[3]' :title='titleAll[0]'/>
    <v-divider/>
    <v-footer :goods='goods' >
    </v-footer>
  </div>
</template>

<script>
import Parameter from '@/components/goods/Parameter'
import Swiper from '@/components/goods/Swiper'
import ProList from '@/components/index/ProList'
import Divider from '@/common/Divider'
import Footer from '@/components/goods/Footer'
import Util from '../util/common.js'

import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant';

import Vue from 'vue';

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,

    'v-swiper':Swiper,
    'v-parameter':Parameter,
    'v-prolist': ProList,
    'v-divider': Divider,
    'v-footer':Footer,
  },

  data() {
    return {
      goods: {
        title: '美国伽力果（约680g/3个）',
        price: 2680,
        express: '免运费',
        remain: 19,
        memTypeArr:0,
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ],
        
      },
      parameter:null,

      titleAll:['新品推荐','热卖推荐'],
      num:[2,4,6,10],
      userInfo:null,
      isSee:false,

    };
  },
  props: {
    classLists: {
      type: Array,
      default: function () {
        return []
      }
    },
    proList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    '$route' (to, from) {
      //console.log('to:'+to.path);
      //console.log('from:'+from.path);
      if (to.path != from.path) {
        //console.log(this.$route.params.id);
        //console.log('重新请求数据！')
        this.getDetail();
        //this.$router.go(0); //刷新
      } else {
        console.log('原来数据信息！')
      }
    },
    proList(newValue,oldValue){
      //console.log(newValue,oldValue);
    }
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
        t.getDetail();
        
      });
  },
  methods: {
    sorry() {
      Toast('暂无后续逻辑~');
    },
    formatPrice(price) {
      //return '¥' + price.toFixed(2);
      if(typeof(price)=='undefined'){
          return '¥' + price
      }else{
          return  '¥' + Number(price.toFixed(2))
      }
    },
    getDetail(){
      //let paramsB = qs('id:41')
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/product/getProDetail',
        params: {
          proID:this.$route.params.pid
        }
      }).then((response) => {
        // 拼接函数(索引位置, 要删除元素的数量, 元素)
        //this.goods.thumb.splice(1, 0, this.imgPath.imgSmall + response.data.data.pimg);

        this.goods = this.twoJsonMerge(this.goods,response.data.data); //接收到的真实数据与默认数据合并
        this.goods.title = this.goods.pname;

        var pimgArr = this.goods.pimg.split(',');
        for (var i = 0; i < pimgArr.length; i++) {
          pimgArr[i] = pimgArr[i];
        }
        this.goods.pimg = pimgArr;
        console.log(this.goods);

        // this.isCanSee(); // 本商品是否可见
        this.parameterObj(); // 商品参数处理
        //this.$store.dispatch('setDatas',this.$route.params.id);

        if (this.goods.memTypeArr == 0) {
          console.log('所有人可见！');
        } else {
          //Toast.fail('部份人可见！');
          this.getMember();
        }

      }).catch(function(error) {
        console.log(error)
      })

    },
    parameterObj () { // 商品参数处理
      let t = this;
      t.parameter = new Object(); //新建一个参数对象
      if (t.goods.properties) {  // 先判断当前商品是否有参数再往操作
        let properties = t.goods.properties;
        let obj = JSON.parse(properties); // 将商品参数转为json对象
        for(let index in obj) {
            let arr = obj[index].split('|');
            for (var i = 0; i < arr.length; i++) {
              if (arr[i] == '') {
                console.log(arr[i] == '','有数据为空！',i);
                arr.splice(i, 1);
                //break;
              }
            }
            t.parameter[index] = arr;
        };
      } else {
        console.log('当前商品没有参数！');
      }
      JSON.stringify(t.parameter);
      Util.removeLocal('parameter'); //清空后再设置数据
      Util.setLocal(t.parameter, 'parameter' );
      //console.log(t.parameter);
    },  // 商品参数 end
    getMember(){ // 获取当前用户信息
      //let paramsB = qs('id:41')
      let self = this ;
      if (self.$store.state.login.userInfo) {
        console.log('有用户信息！')
        this.userInfo = self.$store.state.login.userInfo;
        //console.log(this.userInfo);
        self.isCanSee();
      } else {
        this.$dataApi({
          headers: {'Content-Type': 'multipart/form-data'},
          method: 'post',
          url: '/api/member/getMember',
          //url: '/mobile/index.php?m=console&c=view&a=view',
          params: {
            id:1,
            name:2
          }
        }).then((response) => {
          this.userInfo = response.data.data;
          //console.log(this.userInfo);
          //self.isCanSee();
        }).then((response) => {
          self.isCanSee();
        }).catch(function(error) {
          console.log(error)
        })
      }
      
    },
    isCanSee(){ // 本商品是否可见
      let self = this ;
      console.log(this.userInfo);

      console.log('========== 商品可见权限 ==========');
      console.log('所有人可见：0，普通会员A：4，普通会员B：5，代理A：6，代理B：7，分公司A：8，分公司B：9');
      console.log('========== 商品可见权限 ==========');

      let userPower = new Array;
      let limit = new Array;
      userPower.push(self.userInfo.userType);
      userPower.push(self.userInfo.childType);
      limit = self.goods.memTypeArr.split(',');

      for (var i = 0; i < limit.length; i++) {
        for (var y = 0; y < userPower.length; y++) {
          if ( limit[i] == userPower[y] ) {
            console.log('可见！' , limit[i] , userPower[y] );
            self.isSee = true;
            break;
          }
        }
      }
      console.log(self.isSee);
      console.log(userPower);
      console.log(limit);
      if (self.isSee == false) {
        //Toast.fail('查看'+self.goods.title+'权限不足！');
        Toast('查看商品【 '+self.goods.title+' 】权限不足！');
        this.$router.go(-1);
      }
    },

    //vue合并两个json对象
    //将2的值合并到1，同key时 默认2将会覆盖1的值
    twoJsonMerge(json1,json2){
      var length1 = 0,length2 = 0,jsonStr,str;
      for(var ever in json1) length1++;
      for(var ever in json2) length2++; 
      if(length1 && length2)str = ',';
      else str = '';
      jsonStr = ((JSON.stringify(json1)).replace(/,}/,'}') + (JSON.stringify(json2)).replace(/,}/,'}')).replace(/}{/,str);
      return JSON.parse(jsonStr);
    },


  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;
  .swiper{
    width: 100%;
    min-height: 250px;
    background-color: #fff;
    position: relative;
    padding: 5% 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    .back{
      width: 8vw;
      height: 8vw;
      position: absolute;
      left: 4vw;
      top: 2vw;
      background-color: rgba(50,50,50,.8);
      border-radius: 50%;
      text-align: center;
      i{
        display: inline-block;
        line-height: 8vw;
        font-size: 20px;
        color:#fff;
      }
    }
  }
  &-swipe {
    img {
      width: 100%;
      display: block;
      max-height: 400px;
      object-fit: contain;
    }
  }

  &-title {
    font-size: 16px;
    font-weight: bold;
  }

  &-price {
    color: #f44;

  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
    .content{
      padding: 10px 10px;
      img{
        max-width:100%;
        padding:5px 0px;
      }
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
