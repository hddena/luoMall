<template lang="html">
  <div class="index">
    
    <v-navbar/>

    <!-- <v-topuserinfo/> -->
    <v-search/>
    <!-- <a href="weixin://" οnclick="PIWI_SUBMIT.Weixin_Open()">点击跳转到微信</a> -->
    <v-swipe/>
    <!-- <router-link :to="{path:'/Login', params: { id: 'login' }}">登录</router-link> -->
    <v-serviceicon/>

    <v-roblist :proLists='canPurchase' :num='10' :title='titleAll[0]' :time="timeDiff" v-if="roblistShow && canPurchase.length > 0"/>

    <v-prolist :proLists='proList_proClass.ten.list' colNum="1" num='100' :title='proList_proClass.ten.title' v-if="proList_proClass.ten.length != 0"/>

    <v-prolist :proLists='proList_proClass.one.list' colNum="2" num='100' :title='proList_proClass.one.title' />

    <section class="pic">
      <van-image lazy-load fit="fill" src="http://photocdn.sohu.com/20151217/mp49089845_1450339557278_3_th_fv23.jpg" />
    </section>

    <v-prolist :proLists='proList_proClass.two.list' colNum="2" num='100' :title='proList_proClass.two.title'/>
    <section class="pic">
      <van-image lazy-load fit="fill" src="http://www.jiajujiazhuang.com/images/120907/14060510I-.jpg" />
    </section>
<!-- 

    <v-hotlist :proLists='proList' :num='5' :title='titleAll[2]'/>

    <v-prolist :proLists='proList' :num='num[2]' :title='titleAll[1]'/>

    <v-prolist :proLists='proList' :num='num[2]' :title='titleAll[2]'/>
    <section class="pic">
      <van-image lazy-load fit="fill" src="http://www.jiajujiazhuang.com/images/120907/14060510I-.jpg" />
    </section>
    <v-prolist :proLists='proList' :num='num[2]' :title='titleAll[3]'/>
 -->

    <v-divider/>
    <v-tabbar/>
  </div>
</template>
<script>
  
import Util from '../util/common.js'
import NavBar from '@/common/navBar/navBar'
import TopUserInfo from '@/common/TopUserInfo'
import Search from '@/common/Search'
import Swipe from '@/components/index/Swipe'
import ServiceIcon from '@/components/index/ServiceIcon'
import RobList from '@/components/index/RobList'
import HotList from '@/components/index/HotList'
import ProList from '@/common/ProList'
import Divider from '@/common/Divider'
import Tabbar from '@/common/Tabbar'

export default {
  components: {
    'v-navbar':NavBar,
    'v-topuserinfo': TopUserInfo,
    'v-search': Search,
    'v-swipe': Swipe,
    'v-serviceicon': ServiceIcon,
    'v-roblist': RobList,
    'v-hotlist': HotList,
    'v-prolist': ProList,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  data() {
    return {
      //classList:null,
      //proList:null,
      loading: true,
      titleAll:['限时抢购','新品','超值精选','新品推荐','热卖推荐'],
      num:[2,3,4,6,8],
      sort:[2,2,2],

      roblistShow:false,
      timeDiff:1,

      proListData:{
        type: Array,
        default: function () {
          return []
        }
      },


      proList_proClass:{ // 产品列表（首页展示）
        one:{title:null,list:[]},
        two:{title:null,list:[]},
        three:{title:null,list:[]},
        four:{title:null,list:[]},
        five:{title:null,list:[]},
        six:{title:null,list:[]},
        seven:{title:null,list:[]},
        eight:{title:null,list:[]},
        nine:{title:null,list:[]},
        ten:{title:null,list:[]},
      }
    }
  },
  props: {
    classList: {
      type: Array,
      default: function () {
        return []
      }
    },


  },
  watch: {
    //classLists(newValue,oldValue){
    classList(newValue,oldValue){
      //console.log(newValue,oldValue);
    },
    proList(newValue,oldValue){
      //console.log(newValue,oldValue);
    },
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
    canPurchase(){
      let arr = new Array;
      if (this.proListData) {
        for (var i = 0; i < this.proListData.length; i++) {
          this.proListData[i]
          if (this.proListData[i].isCanPurchase == 1) {
            arr.push(this.proListData[i]);
          }
        }
      }
      console.log(arr);
      return arr;
    },
  },
  mounted: function() {
      let t = this ;

      t.$nextTick(function() {
        t.getPurDateTime ();   // 抢购时间范围
        t.getproList_proClass('a8cb9b56-7f13-447c-9199-39fd24eec10c','one');  // 产品列表（首页展示）- 新品
        t.getproList_proClass('6a105926-2770-4087-84e6-9ab13a60e77e','two');  // 产品列表（首页展示）- 超值精选
        t.getproList_proClass('f5f00c62-c601-4b04-95ed-55ccdf3a0b28','ten');
        t.getproList(); // 产品列表

      });



  },
  methods: {

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

    GetDateTimeDiff(startTime, endTime) {
        console.log(startTime, endTime);
        var retValue = {};
        
        //var date3 = endTime.getTime() - startTime.getTime();  //时间差的毫秒数
        var date3 = endTime - startTime;  //时间差的毫秒数
     
        //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000));
        retValue.Days = days;
     
        var years = Math.floor(days / 365);
        retValue.Years = years;
     
        var months = Math.floor(days / 30);
        retValue.Months = months;
     
        //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        retValue.Hours = hours;
     
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        retValue.Minutes = minutes;
     
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
        retValue.Seconds = seconds;
     
        var strTime = "";
        if (years >= 1) {
            strTime = years + "年前";
        } else if (months >= 1) {
            strTime = months + "个月前";
        } else if (days >= 1) {
            strTime = days + "天前";
        } else if (hours >= 1) {
            strTime = hours + "小时前";
        } else {
            strTime = minutes + "分钟前";
        }
        retValue.PubTime = strTime;     //帖子,文章,博客发表时间的一种简短表示方法
        return retValue;
    },


    getproList(){  // 产品列表
      // console.log('getproList + 产品列表')
      let t = this;
      let stateUserInfo = new Object();
      let stateImgPath = this.$store.state.category.imgPath;
      stateUserInfo = this.userInfo;

      Util.proList(t, stateUserInfo , stateImgPath).then((value) => { // 获取当前用户信息（会员）
        //t.userInfo = Object.assign(t.userInfo, value.data);
        t.proListData = value;
        // console.log(t.proListData);
      });
    },


    getproList_proClass(id,position){  // 产品列表（首页展示）
      let t = this , dataParams;
      if(this.$store.state.login.userInfo){
        dataParams = {
          pcid:id,
          childType:this.$store.state.login.userInfo.childType,
          userType:this.$store.state.login.userInfo.userType
        }
      }else{
        dataParams = { pcid:id }
      };

      t.$dataApi({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        url:"/api/product/getproList_proClass",
        data: dataParams
      }).then((response) => {
        let imgArr = new Array;
        t.proList_proClass[position].title = response.data.data.title;
        t.proList_proClass[position].list = response.data.data.list;
        // console.log(response.data.data.list[i].pimg);
        // console.log(response.data.data.list.pimg.split(','));
        // t.proList_proClass[position].list = response.data.data.list;

        for (var i = 0; i < response.data.data.list.length; i++) {
            t.proList_proClass[position].list[i].pimg = response.data.data.list[i].pimg.split(',');
        }
        console.log(t.proList_proClass[position].list);

        if (response.data.msg != "success") {
          //console.log(response.data.msg);
        }else{
          //console.log(t.proList_proClass);
        }
      }).catch(function(error) {
        console.log(error)
      })

    },
  }
}
</script>

<!-- <style lang="less" scoped> -->
<style lang="less">
.index {
    width: 100%;
    padding-bottom: 14vw;
    /*background-color: #F8FCFF;*/
    /*margin-top: -20px;*/

}
</style>
