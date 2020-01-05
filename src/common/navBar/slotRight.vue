<template lang="html">

    <div class="slotRight">
        <!-- <span><van-icon name="search"/></span> -->
        <van-button v-if="userInfoFn" icon="user-circle-o" @click="goToUser">
            <span v-if="userInfoFn.nickName">{{userInfoFn.nickName}}-{{userInfoFn.userTypeName}}</span>
            <span v-else>{{userInfoFn.userName}}-{{userInfoFn.userTypeName}}</span>
        </van-button>
        <van-button v-else icon="user-circle-o" @click="goToUser">
            <span>未登录</span>
        </van-button>
    </div>

</template>
<script>
import Vue from 'vue';

export default {
  data() {
    return {
      active:0,
    }
  },
  computed: {
    routerPath () {
      return this.$route.path
    },
    userInfoFn () {
      return this.$store.state.login.userInfo
    },
  },
  mounted: function() {
      let t = this;
      t.$nextTick(function() {
          //t.getClassList(); //产品类别列表

          console.log(this.routerPath);
      });
  },
  methods: {
    goToUser() {
      //Toast('按钮');
      this.$router.replace({
        //path: 'login'
        path: '/User'
      })
    },

  }
}
</script>

<style lang="less" scoped>
.slotRight{

  .van-button{border:1px solid #fff;}
  .van-button__text{
    font-size: 80%;
  }
}
</style>
