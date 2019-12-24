<template>
  <section class="serviceIcon">
    <van-row>
      <van-col span="6" v-for="(k,i) in service" :key='i' @click='navigation(i)'><van-icon :name="k.icon" /><h2 v-text='k.name'></h2></van-col>
    </van-row>
  </section>
</template>

<script>
import Vue from 'vue';
import { Row, Col ,Icon , Toast } from 'vant';
Vue.use(Row).use(Col).use(Icon).use(Toast);
export default {
  data () {
    return {
      service: [
        {
          name:'分类',
          icon:'apps-o',
        },
        {
          name:'搜索',
          icon:'search',
        },
        {
          name:'购物车',
          icon:'shopping-cart-o',
        },
        {
          name:'客服',
          icon:'chat-o',
        },
      ],

    }
  },
  props: {
    title:null,
    proLists: {
      type: Array,
      default: function () {
        return []
      }
    },
    num:null,
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        //console.log(t.proLists);
      });
  },
  methods: {
    navigation(i){
      console.log(i);

      switch(i) {
           case 0:
              this.$router.replace({
                //path: 'login'
                path: '/Category'
              })
              break;
           case 1:
              this.$router.replace({
                //path: 'login'
                path: '/Search'
              })
              break;
           case 2:
              this.$router.replace({
                //path: 'login'
                path: '/Cart'
              })
              break;
           default:
              //Toast('客服！');
              window.open("tel:13570859899");
      } 

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped> -->
<style lang="less">
.serviceIcon{
  padding: 10px 0px;
  background-color: #fff;
  .van-row{
    .van-col{
      text-align: center;
      i{
        font-size: 24px;
        margin-bottom: 10px;
      }
      h2{
        /*color: #f00;*/
      }
    }
    .van-col:nth-child(1) i{
      color: #f4a32d;
    }
    .van-col:nth-child(2) i{
      color: #ee4f77;
    }
    .van-col:nth-child(3) i{
      color: #bc76ea;
    }
    .van-col:nth-child(4) i{
      color: #5898e0;
    }
    .van-col:nth-child(5) i{
      color: #f00;
    }
  }
}

</style>
