<template lang="html">
  <div class="divider">
    <van-divider>{{msg}}</van-divider>
  </div>
</template>
<script>
import Vue from 'vue';
import { Divider } from 'vant';

Vue.use(Divider);
export default {
  data() {
    return {
      msg:'深圳市美折购电子商务有限公司',
    }
  },

  mounted: function() {
      let t = this;
      t.$nextTick(function() {
          //t.getClassList(); //产品类别列表

      });
  },
  methods: {
    onSearch(){
      //let paramsB = qs('id:41')
      let t = this;
      Toast('搜索功能未完善！无法搜索：'+t.value);
      console.log(t.value);
    },

  }
}
</script>

<style lang="less" scoped>
.divider{

}
</style>
