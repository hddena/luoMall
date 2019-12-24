<template lang="html">
  <section class="defaultAddress" v-if="defaultAddress">
    <van-cell :title="'姓名：'+defaultAddress.trueName" :label="defaultAddress.addrDetail" icon="user-o" is-link value="修改默认地址" to="/Address" />
  </section>

  <section class="defaultAddress" v-else>
    <van-cell title="添加地址" icon="add-square" is-link to="/AddressAdd" />
  </section>

</template>
<script>
// import Gologin from '@/components/car/gologin.vue'
export default {
  data() {
    return {
      modifyAddressId: '1',
      chosenAddressId: 1,
      //addressList:null,
    }
  },
  props: {
    defaultAddress:{
      //type: Array,
      default: function () {
        return []
      }
    },
  },
  methods: {
    getListAddress(){  // 获取发货列表（会员）
      //let paramsB = qs('id:41')
      let t = this;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getListAddress',
      }).then((response) => {
        for (var i = 0; i < response.data.data.length; i++) {
          if(response.data.data[i].isDefault == 1){
            t.defaultAddress = response.data.data[i];
            break;
          }
        }
        if (t.defaultAddress == null) {
            Toast.fail('您地址有误！');
        }
        console.log(t.defaultAddress);
      }).catch(function(error) {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="less" scoped>
.defaultAddress {
  padding: 15px;
  background-color: #fff;
  position: relative;
  .van-cell{
    padding: 0px;
  }

}
  .defaultAddress:before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background-size: 80px;
    content: '';
}
</style>
