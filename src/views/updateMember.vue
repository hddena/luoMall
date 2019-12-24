<template lang="html">
  <section class="modifyInfo">
    <v-navbar/>
    <div class="userForm">
      <van-cell-group>
        <!-- <van-cell title="用户名" icon="manager" :value="userInfo.userName" /> -->
        <van-field
          v-model="userInfo.nickName"
          required
          clearable
          label="昵称"
          left-icon="smile"
          placeholder="请输入昵称"
          @click-right-icon="$toast('question')"
        />
        <van-field
          v-model="userInfo.prepwd"
          type="password"
          label="原密码"
          left-icon="lock"
          placeholder="不修改密码请不要填写"
          required
        />
        <van-field
          v-model="userInfo.pwd"
          type="password"
          label="新密码"
          left-icon="lock"
          placeholder="不修改密码请不要填写"
          required
        />
        <van-field
          v-model="userInfo.repwd"
          type="password"
          label="确认新密码"
          left-icon="lock"
          placeholder="请再次填写新密码"
          required
        />

        <van-field
          v-model="userInfo.memMobile"
          type="tel"
          label="手机号码"
          left-icon="phone"
          placeholder="请输入手机号"
          required
        />

<!-- 
        <van-field
          v-model="birthday"
          label="生日"
          left-icon="clock"
          placeholder="请输入您的生年月日"
        />

        <van-cell title="上级推广码" icon="vip-card" value="内容" />

        <van-field
          v-model="userInfo.sex"
          label="性别"
          left-icon="friends"
          placeholder="先生 / 小姐"
          required
        />
 -->
        <van-radio-group v-model="radio" class="van-cell van-cell--required van-field">
          <div class="van-field__left-icon"><i class="van-icon van-icon-friends"><!----></i></div>
          <div class="van-cell__title van-field__label"><span>性别</span></div>
          <div class="radio_body">
            <van-radio name="1">先生</van-radio>
            <van-radio name="2">小姐</van-radio>
          </div>
        </van-radio-group>

      </van-cell-group>

    </div>
    <div class="userBut">

      <van-button type="danger" v-on:click="updateMember()">更新信息</van-button>
    </div>
    <v-divider></v-divider>
    <v-tabbar/>
  </section>
</template>

<script>
  import Vue from 'vue';
  import NavBar from '@/common/NavBar'
  import Divider from '@/common/Divider.vue';

  import Tabbar from '@/common/Tabbar'
  import Util from '../util/common.js';

  import { Field , Cell, CellGroup, Button , Toast , DatetimePicker } from 'vant';
  Vue.use(Cell).use(CellGroup);
  Vue.use(Field);
  Vue.use(DatetimePicker);
  Vue.use(Button);

import { RadioGroup, Radio } from 'vant';
Vue.use(RadioGroup);
Vue.use(Radio);


export default {

  name:'Register',
  components:{
    'v-navbar': NavBar,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  data(){
    return {
      radio: '1',

      birthday: new Date(),

      username:null,
      email:'email',
      password:null,
      recpassword:null,
      phone:null,
      gender:null, //性别
      recomNum:null, //推广码
      toggle:!this.$store.state.login.token,

      userInfo:{
        memMobile: "",
        sex: "先生",
        birthDate: "2020-10-01", 
        nickName: "",
        memID: "8A00E8A5-AF07-4D6E-9FE3-13EE14D2CA46",
        updateType: "1",
        prepwd: "",
        pwd: "",
        repwd: "",
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
    proList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted: function() {
      const self = this;
      let t = this ;
      t.$nextTick(function() {
        //console.log(this.$router);

        Util.getMember(self).then((value) => { // 获取当前用户信息（会员）
          t.userInfo = Object.assign(t.userInfo, value.data);
          console.log(t.userInfo);
        });


      });
  },
  methods:{

    updateMember(){
      let t = this;
      let self = this;
      let parameter = {
        memMobile: self.userInfo.memMobile,
        sex: self.userInfo.sex,
        birthDate: self.userInfo.birthDate,
        nickName: self.userInfo.nickName,
        memID: self.userInfo.memID,
        updateType: self.userInfo.updateType,
        prepwd: self.userInfo.prepwd,
        pwd: self.userInfo.pwd,
        repwd: self.userInfo.repwd
      }

      if (this.userInfo.nickName  == '') { //判断用户名是否有填写
        Toast('您没填写昵称！');
      } else {
        if (this.userInfo.memMobile == '') { //判断手机号码是否有填写
          Toast('手机号码没填写！');
        } else {

          if (this.userInfo.prepwd != '') {  //如果原密码为空就直接执行下一步
              if (this.userInfo.pwd == '' || this.userInfo.repwd == '' || this.userInfo.pwd  != this.userInfo.repwd) { //判断填写的两个密码是否相等
                Toast('填写两次密码不一致！');
              } else {
                console.log(parameter);
                Util.updateMember(self , parameter).then((value) => {
                  if (value.ret == 999) {
                    console.log(value.msg);
                  } else {
                    Util.getMember(self).then((value) => { // 获取当前用户信息（会员）
                      t.userInfo = Object.assign(t.userInfo, value.data);
                      console.log(t.userInfo);
                    });
                  }


                });
              }
          } else {
                console.log(parameter);
                Util.updateMember(self , parameter).then((value) => {
                  Util.getMember(self).then((value) => { // 获取当前用户信息（会员）
                    t.userInfo = Object.assign(t.userInfo, value.data);
                    console.log(t.userInfo);
                  });
                });
          }

        }

      }

    },

  }
}

</script>

<style lang="less" scoped>
.modifyInfo {
  background-color: #fff;
  .userForm {
    padding: 5% 5% 3% 5%;
  }
  .userBut{
    padding: 3%;
    text-align: center;
    button{
      width: 90%;
      margin: 2% auto;
    }
  }
  .van-cell__title {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    width: 90px;
  }
  .van-cell__value{
    text-align: left;
    color: #000;
  }
  .radio_body{
    width: 100%;
    .van-radio{
      width: 48%;
      float: left;
    }
  }
}
</style>
