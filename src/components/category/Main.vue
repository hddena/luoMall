<template>
  <section class="main">
    <div class="topPic"><van-image lazy-load fit="cover" src="https://www.apple.com/v/iphone-11-pro/a/images/overview/camera/night_mode_hero__bhkljycv3v36_large.jpg" /></div>
    
    <van-card
      v-for="(k,i) in proLists" :key="i" v-if="proLists && k.cname == className"
      num="1"
      :price="k.price_normal"
      :origin-price="parseFloat(k.price_normal *1.2).toFixed(2)"
      :desc="k.cname"  
      :title="k.pname"
      :thumb="k.pimg[0]"
      v-on:click="detail(k.pid)"
    >
    
    </van-card>
  </section>
</template>

<script>
import Vue from 'vue';
import { Card } from 'vant';
Vue.use(Card); //Card 卡片

export default {
  data () {
    return {
      className: null,
    }
  },
  props: {
    classLists: {
      type: Array,
      default: function () {
        return []
      }
    },
    proLists: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    $route (to, from) {
      //console.log(this.$route.params.className);
      this.className = this.$route.params.className;
    },
    //classLists(newValue,oldValue){
    classLists(newValue,oldValue){
      console.log(newValue,oldValue);
      if (this.$route.params.className == undefined) {
        this.className = this.classLists[0].cname;

        console.log(this.className);
      } else {
        this.className = this.$route.params.className;
        console.log(this.className);
      }
   },
  },
  computed: {
    imgPath () { // 图片地址
      return this.$store.state.category.imgPath
    },
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        t.classNameF();
      });
  },
  methods: {
    classNameF(){
      //console.log(this.classLists[0].cname);
    },
    detail(res){
      this.$router.push({
        name: '商品详情',
        params: {'pid': res}
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style lang="less" scoped> -->
<style scoped>

.main{
  padding-left: 95px;
}
.main .topPic{
  width: 100%;
  height: 100px;
  overflow: hidden;
}
.main .topPic img{
  width: 100%;
}
</style>
