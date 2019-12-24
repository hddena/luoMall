<template lang="html">
  <section class="notes">
    <h1>notes</h1>
    <v-divider></v-divider>
    <v-tabbar/>
  </section>
</template>

<script>
  import Vue from 'vue';
  import Divider from '@/common/Divider.vue';
  import Tabbar from '@/common/Tabbar'
  import Util from '../util/common.js';

  import { Button , Toast } from 'vant';

  Vue.use(Button);

export default {
  name:'notes',
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
        t.notesFun();
      });
  },

  methods:{
    notesFun(){
      console.log('notesFun');
    },

    logout(){
      Toast('退出登录成功,清除token');
      this.$store.commit('CHANGE_TOKEN',0);
      this.toggle = true;
      this.account = '';
      this.password = '';
      this.dataState();
    },

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
