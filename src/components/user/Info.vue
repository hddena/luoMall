<template>
  <section class="info">
    <div class="infoBoxBg">
      <h2  @click="settings">
        <van-icon name="setting-o" />
        <span>设置</span>
      </h2>
      <van-action-sheet
        v-model="showActionSheet"
        title="设置"
        :actions="ActionSheetActions"
        cancel-text="取消"
        @select="onSelect"
        @cancel="onCancel"
      />
    </div>
    <div class="infoBox">
      <div class="userInfo" v-if="info">
        <div class="pic"><van-icon name="contact" /></div>
        <div class="userName">
          <h1 v-if="info.nickName" v-text="info.nickName"></h1>
          <h1 v-else v-text="info.userName"></h1>
          <p title="登录时间">推广码：<span>{{ info.recomNum }}</span></p>
        </div>
        <div class="layer">
          <h2><van-icon name="gem-o" /><span>{{ info.userTypeName }}</span></h2>
        </div>
      </div>
      <div class="integral">
        <a href="javascript:;" @click="userIntegral">
          <!-- <h2>{{amountCommissions}}</h2> -->
          <van-icon name="points" />
          <p>积分</p>
        </a>
        <a href="javascript:;" @click="infoListCommission">
          <!-- <h2>{{amountCommissions}}</h2> -->
          <van-icon name="exchange" />
          <p>佣金列表</p>
        </a>
        <a href="javascript:;" @click="judgeToday">
          <!-- <h2 >88</h2> -->
          <van-icon name="balance-o" />
          <p >提现</p>
        </a>
        <a href="javascript:;" @click="qr_code">
          <!-- <h2 >{{ info.recomNum }}</h2> -->
          <van-icon name="qr" />
          <p >分享</p>
        </a>
      </div>
      <van-notice-bar
        :text="notice"
        left-icon="volume-o"
        v-if="notice"
      />
      <!-- <h1>{{ info }}</h1> -->
    </div>

<van-popup 
  v-model="show"
  get-container="body"
  closeable
  close-icon-position="top-left"
>
<div class="qr_code">
  <qrcanvas :options="options" @updated="onUpdated" />
  <!-- <img src="./../assets/icon/icon_qr_code.png"> -->
</div>
<p class="qr_text">扫一扫二维码图案，分享推广！</p>
</van-popup>

  </section>
</template>

<script>
import Util from '../../util/common.js';
import Vue from 'vue';
import { QRCanvas } from 'qrcanvas-vue';
import { NoticeBar , Popup , Toast , Dialog ,ActionSheet  } from 'vant';

Vue.use(ActionSheet);  //ActionSheet 上拉菜单

Vue.use(NoticeBar);
Vue.use(Popup); // Popup 弹出层
Vue.use(Toast);
Vue.use(Dialog); // Dialog 弹出框
export default {
  name: 'HelloWorld',
  data () {
    return {
      show: false,
      urlText: 'http://www.cmsya.com/',
      notice: '提现日期为每月1号、15号两天，提现金额必须大于￥100.00元！',

      showActionSheet: false,
      ActionSheetActions: [
        { name: '设置地址', color: '#f00' },
        { name: '更新用户信息', color: '#f00' },
        { name: '退出登录', color: '#f00' },
      ]

    }
  },
  props: {
    info: {},
    amountCommissions: null,
    listCommission: null,
  },
  watch: {
    info(newValue,oldValue){
      //console.log(newValue,oldValue);
      //this.urlText = 'http://' + window.location.host + '/' + window.location.search + '#/register?recomNum='+ this.info.recomNum;
      //this.urlText = 'http://' + window.location.host + '/' + window.location.search + '#/register';

      this.urlText = 'http://' + window.location.host + '/' + '?recomNum=' + this.info.recomNum + '#/register';

      console.log(window.location.host);
      console.log(window.location.search);
      console.log(this.info.recomNum);
      console.log(this.urlText);
    }
  },
  computed: {
    options() {
      return {
        cellSize: 8,
        //correctLevel: 'H',
        data: this.urlText,
        unpaid:null,  //未付款
      };
    },
  },
  components: {
    'qrcanvas':QRCanvas,
  },

  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        //this.urlText = 'http://' + window.location.host + '/dist/' + window.location.search + '#/register';
      });
  },
  methods: {
    settings(){
      this.showActionSheet = true;
      // Toast('功能未完善！');
    },
    onSelect(val){
      //console.log(val.name);
      if (val.name == this.ActionSheetActions[0].name) {
        this.$router.replace({
          path: '/Address',
          // query: {redirect: router.currentRoute.fullPath}
        })
        console.log(val.name);
      } else if (val.name == this.ActionSheetActions[1].name) {
        this.$router.replace({
          path: '/updateMember',
          // query: {redirect: router.currentRoute.fullPath}
        })
        console.log(val.name);
      } else if (val.name == this.ActionSheetActions[2].name)  {
        this.LogOut();
        console.log(val.name);
      } else {
        console.log(val);
      }
    },
    onCancel(){
      console.log('onCancel');
    },
    LogOut(){ // 用户退出登录
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/account/LogOut',
        //url: '/mobile/index.php?m=console&c=view&a=view',
        params: {
          id:1,
          name:2
        }
      }).then((response) => {
        window.localStorage.removeItem('userInfo'); // 退出时清空本地会员信息
        this.$store.commit('USER_INFO',''); // 退出时清空 Vuex 用户信息
        Toast('退出登录成功！');
        location.reload(); //信息清除后刷新页面
        this.$router.replace({
          path: '/home',
          // query: {redirect: router.currentRoute.fullPath}
        });

        Util.removeLocal('userInfo');
        console.log(response)
        //console.log(response.data);
      }).catch(function(error) {
        //console.log(error)
      })
    },
    userIntegral(){
      Toast('当前身份为：【'+ this.info.userTypeName+'】\n\n当前积分为：【'+ this.info.memLoginCount+'】');
      /*
      Dialog.alert({
        message: '当前身份为：【'+ this.info.userTypeName+'】\n当前积分为：【'+ this.info.memLoginCount+'】'
      }).then(() => {
        // on close
      });
      */
    },
    infoListCommission(){
      //Toast('您还没有记录！努力赚取积分吧！infoListCommission');
      if (this.listCommission.length == 0) {
        console.log('您还没有记录！努力赚取积分吧！');
        Toast('您还没有记录！努力赚取积分吧！');
      } else {
        Toast(this.listCommission);
      }
    },
    judgeToday(){
      let today = new Date().getDate();
      let time = 3000;
      switch(today) {
       case 1:
          this.cashIn();
          break;
       case 15:
          this.cashIn();
          break;
       default:
          Toast({
            message: '今天是'+today+'号，不是提款日期！',
            duration: time
          });
      }
    },
    cashIn(){
      let today = new Date().getDate();
      let time = 3000;
        MessageBox.prompt('请输入提现金额').then(({ value, action }) => {
          let val = parseFloat(value);
          if ( isNaN(val) != false ) {
            Toast({
              message: '您输入出错！',
              duration: time
            });
          } else if (val < 100) {
            Toast({
              message: '提现需要大于100元！',
              duration: time
            });
          } else {
            Toast({
              message: '成功提现：'+val+'元！',
              duration: time
            });
          }
        });
      
    },
    qr_code(){ //二维码分享
      console.log('show van-popup');
      if (this.show) {
        this.show = false;
        console.log(this.show);
      } else {
        this.show = true;
        console.log(this.show);
      }
    },
    onUpdated() {
      console.log('updated');
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.info{

  width: 100%;
  /*padding-top: 100px;*/

  .infoBoxBg{
    position: relative;
  width: 100%;
  height: 100px;
  background-color: #ff976a;
  background: -webkit-linear-gradient(115deg, #d253b1, #fb6f4a);
  background: linear-gradient(-25deg, #d253b1, #fb6f4a);
  /*background-image: url('../../assets/img/login_bg.png');*/
  background-size: 150%;

    h2{
      text-align: right;
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fff;
      .van-icon{
        margin:0px 3px 0px 0px;
      }
      span{

      }
    }
    .van-popup{
      width: 90%;
    }
  }
  .infoBox{
    width: 90%;
    padding: 3%;
    border-radius: 10px;
    background-color: #fff;
    margin: -50px auto 10px auto;
    position: relative;
    .userInfo{
      margin-top: 0%;
      display: flex;
      .pic{
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 40px;
        color: #fff;
        text-align: center;
        border:2px solid #f4f4f4;
        background-color: #e4393c;
        border-radius: 50%;
        overflow: hidden;
      }
      .userName{
        margin-top: 0%;
        margin-left: 2%;
        h1{
          font-size: 20px;
          color: #000;
          line-height: 200%;
        }
      }
      .layer{
        position: absolute;
        top: 10px;
        right: 0px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background-color:rgba(0,0,0,0.3);
        color: #fff;
        h2{
          padding: 3px 5px;
          i{

          }
          
        }
      }
    }
    .integral{
      display: flex;
      margin: 10px 0;
      /*border-top:1px solid rgba(0,0,0,0.3);*/
      a{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        h2{
          font-size: 24px;
          line-height: 180%;
          color: #e4393c;
        }
        i{
          font-size: 230%;
          color: #f00;
        }
        p{
          color:#666;
          line-height: 200%;
        }
      }
    }
  }

}
.van-popup{
  width: 65%;
  padding: 40px 5% 5% 5%;
  border-radius: 5px;
  .qr_code{
    width: 100%;
    canvas{
      width: 100%;
    }
  }
  .qr_text{
    font-size:14px;
  }
}
</style>
