<template lang="html">
  <section class="register">
    <v-navbar/>
    <div class="userForm">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          left-icon="manager"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          left-icon="lock"
          placeholder="请输入密码"
          required
        />
        <van-field
          v-model="recpassword"
          type="password"
          label="确认密码"
          left-icon="lock"
          placeholder="请输入密码"
          required
        />
        <van-field
          v-model="phone"
          type="tel"
          label="手机号码"
          left-icon="phone"
          placeholder="请输入手机号"
          required
        />
        <van-field
          v-model="birthday"
          label="生日"
          left-icon="clock"
          placeholder="请输入您的生年月日"
        />

        <van-field
          v-model="recomNum"
          label="推广码"
          left-icon="vip-card"
          placeholder="请输入推广码"
        />
        <van-field
          v-model="gender"
          label="性别"
          left-icon="friends"
          placeholder="先生 / 小姐"
          required
        />
      </van-cell-group>

    </div>
    <div class="userBut">

      <van-button type="danger" v-on:click="register()">注册</van-button>
      <van-button type="danger" to="/login" plain>登录</van-button>
    </div>
    <v-divider></v-divider>
    <v-tabbar/>
  </section>
</template>

<script>
  import Vue from 'vue';
  import NavBar from '@/common/navBar/navBar'
  import Divider from '@/common/Divider.vue';

  import Tabbar from '@/common/Tabbar'
  import Util from '../util/common.js';

  import { Field , Cell, CellGroup, Button , Toast , DatetimePicker } from 'vant';
  Vue.use(Cell).use(CellGroup);
  Vue.use(Field);
  Vue.use(DatetimePicker);
  Vue.use(Button);

export default {

  name:'Register',
  components:{
    'v-navbar': NavBar,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  data(){
    return {
      username:null,
      email:'email',
      password:null,
      recpassword:null,
      phone:null,
      birthday:null,
      gender:null, //性别
      recomNum:null, //推广码
      toggle:!this.$store.state.login.token
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
      let t = this ;
      t.$nextTick(function() {
        //Util.getEffectiveTime('userInfo',1000*60*60*24);//过期时间为24小时
        //console.log(this.$router);
        console.log(this.$route);
        this.recomNum = Util.getQueryString('recomNum');
        console.log('推广码：' + Util.getQueryString('recomNum')); //获取地址栏推广码
      });
  },
  methods:{
    register(){
      console.log(this.username);
      console.log(this.email);
      console.log(this.password);
      console.log(this.recpassword);
      console.log(this.phone);
      console.log(this.birthday);
      console.log(this.recomNum);
      console.log(this.gender);

      if (this.username == null || this.username == '') { //判断用户名是否有填写
        Toast('用户名没填写！');
      } else {
        if (this.password == null || this.password == '' || this.recpassword != this.password) { //判断填写的两个密码是否相等
          Toast('填写两次密码不一致！');
        } else {
          if (this.phone == null || this.phone == undefined || this.phone == '') { //判断手机号码是否有填写
            Toast('手机号码没填写！');
          } else {
            this.$dataApi({ //会员注册
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              method: 'post',
              url: '/api/account/addMember',
              //url: '/mobile/index.php?m=console&c=view&a=view',
              data: {
                userName : this.username,
                email : this.email,
                memPassword : this.password,
                recpassword : this.recpassword,
                phone : this.phone,
                birthday : this.birthday,
                recomNum : this.recomNum,
                gender : this.gender
              }
            }).then((response) => {
              console.log(response.data.ret);
              //console.log(response.data.data);
              console.log('addMember:'+response.data.msg);
              Toast({
                message: response.data.msg,
                position: 'bottom',
                duration: 5000
              });
              if (response.data.ret == 1) {
                setTimeout(() => {
                  this.$router.replace({
                    path: '/'
                  })
                }, 5000)
              }
            }).catch(function(error) {
              console.log(error)
            })
          }
        }
      }

    },

  }
}

</script>

<style lang="less" scoped>
.register {
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
}
</style>
