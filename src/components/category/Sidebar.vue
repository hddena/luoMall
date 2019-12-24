<template>
  <div class="sidebar">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item 
      v-for="(k,i) in classLists" 
      :key='i' 
      :title="k.cname" 
      v-on:click="change"
      :to="'/Category/'+k.cname"
      />
    </van-sidebar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Sidebar, SidebarItem } from 'vant';

Vue.use(Sidebar);
Vue.use(SidebarItem);

export default {
  name: 'Sidebar',
  data () {
    return {
      msg: 'Welcome to Your sidebar',
      activeKey: 0
    }
  },
  props: {
    classLists: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
        //console.log(this.change());
      });
  },
  methods: {
    change(index){
      //let paramsB = qs('id:41')
      this.activeKey = index;
      //console.log(this.activeKey);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style lang="less" scoped> -->
<style scoped>
.sidebar{
    position: fixed;
    top: 100px;
    left: 0px;
    bottom: 0px;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fafafa;
  .van-sidebar{
    max-width: 100px;
  }

}
</style>
