<template>
    <div class="confirm">

      <van-dialog
        v-model="showDialog"
        :title="goods.title+'confirm'"
        show-cancel-button
        @confirm="onConfirm"
      >
        <div class="pic" v-if="goods"><img :src="imgPath.imgMiddle + goods.pimg[0]"></div>
        <div class="content" v-if="this.$store.state.detail.selectedParameter">
          <span >己选</span>
          <p>{{JSON.stringify(this.$store.state.detail.selectedParameter).replace(/"/g,"").replace(/,/g,"，").replace(/{/g,"").replace(/}/g,"")}}</p>
          <span>数量：</span>{{num}}
        </div>
        
      </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue';
import Util from '../../util/common.js'

import {
  Toast,
  Dialog
} from 'vant';
Vue
  .use(Toast)
  .use(Dialog);
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component ,
  },

  data() {
    return {
      //skuu: null,
    };
  },
  props: {
    showDialog:true,  // true , false
    num:1, 
    goods: {
        type: Object,
        default: () => {}
    },

  },
  watch: {
    goods(newValue,oldValue){
      console.log(newValue,oldValue);
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
        //console.log(this.$route);

      });
  },
  methods: {
    onConfirm(){
      var t = this;
      return new Promise(function(resolve, reject) {
        resolve('OK');
      })
      .then(action => {
          //点击成功执行这里的函数
          console.log(t.addIntoCarProduct);
          this.$store.dispatch('setLocalCount', true);
          this.$store.dispatch('addCarList', t.addIntoCarProduct);
          Toast({
            message: '添加成功',
            duration: 1000
          });
        })
      .catch(function(error) {
        console.log(error)
      })
    },

  }
};
</script>

<style lang="less">
.confirm {

}
</style>
