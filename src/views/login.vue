<template lang="html">
  <section class="login">
    <div class="nk_logo">
      <router-link :to="{ path: '/home' }" class="login_home">
        <img src="./../assets/img/icon/home_check.png">
      </router-link>
      <router-link :to="{ name: ' ' }" class="login_bg">
        <img src="./../assets/img/login_bg.png">
      </router-link>
      <div class="login_home_bg"></div>
    </div>
    <div class="userForm">
      <van-cell-group>
        <van-field
          v-model="account"
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
      </van-cell-group>

    </div>
    <p style="text-align: center;color: #f00;">提示：company 、 agent 、 user</p>
    <div class="userBut">
      <van-button type="danger" v-on:click="login()">登录</van-button>
      <van-button type="danger" to="/register" plain >注册</van-button>
    </div>
    <v-divider></v-divider>
    <v-tabbar/>
  </section>
</template>

<script>
  import Vue from 'vue';
  import Divider from '@/common/Divider.vue';
  import Tabbar from '@/common/Tabbar'
  import Util from '../util/common.js';

  import { Field , Cell, CellGroup, Button , Toast } from 'vant';
  Vue.use(Cell).use(CellGroup);
  Vue.use(Field);
  Vue.use(Button);

export default {
  name:'login',
  components:{
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  data(){
    return {
      account:'company001',
      password:'123456',
      //toggle:!this.$store.state.login.token,
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
/*
        console.log( t.account  );
        console.log( t.password  );
        console.log( t.toggle );
        console.log( t.$store.state.login.token );
*/
        //this.dataState();
        //this.checkLogin(); // 检查登录状态！
          //var value = '{"name":"和派孔明","Age":"18","address":"陆家嘴金融城"}';
          //t.setEffectiveTime('login',value);
          //Util.getEffectiveTime('userInfo',1000*60*60*24);//过期时间为24小时
        //Util.isLogin(t);  //是否登录

        //this.appStyle();
      });
  },

  methods:{
    checkLogin(){ // 检查登录状态！
      if (this.$store.state.login.token == 1) {
        this.$router.replace({
          path: '/user'
        })
      } else {
        console.log('未登录！')
      }
    },
    // 登录按钮
    login(){
      if(this.account!=="" && this.password!=="") {
        this.$dataApi({
          headers: {'Content-Type': 'multipart/form-data'},
          method: 'post',
          url: '/api/member/login',
          //url: '/mobile/index.php?m=console&c=view&a=view',
          params: {
            userName:this.account,
            userpwd:this.password
          }
        }).then((response) => {
          //this.buyear = response.data.data;
          //console.log(response);
          console.log('login:'+response.data.msg);
          if (response.data.ret == 1) {
            //Util.setEffectiveTime('userInfo',response.data.data);
            //console.log(response.data.data);

            this.$store.commit('USER_INFO',response.data.data); //用户信息赋值到 Vuex

            Toast('登录成功,跳转到会员中心！');
            this.toggle = false;
            this.$store.commit('CHANGE_TOKEN',1);
            //this.$store.commit('USER_INFO',response.data.data);
            //Util.setEffectiveTime('userInfo',response.data.data);

            setTimeout(()=>{
              this.$router.replace({
                path: 'user'
              })
            },1000);
            // 登录成功
          } else {
            Toast(response.data.msg);
            console.log('login:'+response.data.msg);
          }

        }).catch(function(error) {
          console.log(error)
        })

      }else {
        Toast('账号或密码有误！');
      }

    },
    register(){
      //console.log('注册');
      this.$router.replace({
        path: 'register'
      })
    },
    //数据状态
    dataState(){
      console.log( '--------------- Login 数据状态 ---------------'  );
      console.log( this.account  );
      console.log( this.password  );
      console.log( this.toggle );
      console.log( this.$store.state.login.token );
      console.log( '-------------- Login End 数据状态 --------------'  );
    },
    //退出登录按钮
    logout(){
      Toast('退出登录成功,清除token');
      this.$store.commit('CHANGE_TOKEN',0);
      this.toggle = true;
      this.account = '';
      this.password = '';
      this.dataState();
    },

    appStyle(){
      let appStyle = document.getElementById('app');
      appStyle.style.backgroundColor="#fff";
      console.log(appStyle);
    }

  }
}

</script>

<style lang="less" scoped>

.login{
  background-color: #fff;
  .nk_logo{
    position: relative;
    margin-bottom: 5%;
    .login_home{
      position: absolute;
      z-index: 80;
      width: 10%;
      background: #fff;
      top: 15px;
      padding-right: 8px;
      border-top-right-radius: 18px;
      border-bottom-right-radius: 18px;
      text-align: center;
      img{
        height: 20px;
        margin: 3px 2px;
      }

    }
    .login_bg{
      display: block;
      img{
        width: 100%;
      }
    }
    .login_home_bg{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20%;
      /*background-color: #000;*/
      background: -webkit-linear-gradient(left,rgba(0,0,0,0),rgba(255,255,255,1)); /* Safari 5.1 - 6 */
      background: -o-linear-gradient(bottom,rgba(0,0,0,0),rgba(255,255,255,1)); /* Opera 11.1 - 12*/
      background: -moz-linear-gradient(bottom,rgba(0,0,0,0),rgba(255,255,255,1)); /* Firefox 3.6 - 15*/
      background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(255,255,255,1)); /* 标准的语法 */
    }
  }
  .userForm{
    padding: 10% 5%;
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
