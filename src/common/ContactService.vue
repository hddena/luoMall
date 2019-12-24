<template>
  <section class="ContactService">
    <van-row type="flex" class="user-links">
      <van-col span="6" @click="phone">
        <van-icon name="phone-o"/>
        电话
      </van-col>
      <van-col span="6" @click="qqOnline">
        <van-icon name="star-o" />
        QQ
      </van-col>
      <van-col span="6" @click="weChat">
        <van-icon name="chat-o" />
        微信
      </van-col>
    </van-row>
  </section>
</template>
<script>
import { Row, Col, Icon} from 'vant';
export default {
  name:'User',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,

  },
  data(){
    return {
      //show: false
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

  mounted: function() {
    let t = this ;
    t.$nextTick(function() {

      //console.log(t.userInfo);
    });
  },
  methods:{

    showPopup() {
      //this.show = true;
    },
    phone(){
      console.log('准备打电话！')
      window.open("tel:13570859899");
      //window.open("http://www.cmsya.com");
    },
    qqOnline(){
      console.log('连接在线QQ！')
      window.open("http://wpa.qq.com/msgrd?v=3&uin=42524073&site=qq&menu=yes");
    },
    weChat(){
      console.log('打开微信！')
      //window.open("xiami://");
      window.open("weixin://");

      //window.open("weixin://dl/business");
      //window.open("weixin://dl/scan"); //  扫一扫
      //window.open("weixin://dl/feedback"); //  反馈
      //window.open("weixin://dl/moments"); //  朋友圈
      //window.open("weixin://dl/settings"); //  设置
      //window.open("weixin://dl/notifications"); //  消息通知设置
      //window.open("weixin://dl/chat"); //  聊天设置
      //window.open("weixin://dl/general"); //  通用设置
      //window.open("weixin://dl/officialaccounts"); //  公众号
      //window.open("weixin://dl/games"); //  游戏
      //window.open("weixin://dl/help"); //  帮助
      //window.open("weixin://dl/feedback"); //  反馈
      //window.open("weixin://dl/profile");// 个人信息
      //window.open("weixin://dl/features"); //  功能插件

    }
  }
};
</script>

<style lang="less">
.ContactService {

}
</style>
