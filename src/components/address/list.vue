<template lang="html">
  <section class="list">
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      @select="onSelect"
      @add="onAdd"
      @edit="onEdit"
    />
  </section>
</template>

<script>
// 提示登录组件
//import Gologin from '@/components/car/gologin.vue';
import Util from '../../util/common';

import Vue from 'vue';
import { Toast , AddressList } from 'vant';
Vue.use(Toast);
Vue.use(AddressList);

export default {
  data() {
    return {
      modifyAddressId: '1',
      chosenAddressId: 1,
      //addressList:null,
    }
  },
  props: {
    addressList:{
      type: Array,
      default: function () {
        return []
      }
    },
  },
  watch: {
    addressList(newValue,oldValue){
      let val ;
      if (newValue) {
        val = newValue;
      } else {
        val = oldValue;
      }
      console.log(val);
      for (var i = 0; i < val.length; i++) {
        if(val[i].isDefault == 1){
          this.chosenAddressId = val[i].id;
        }
      }
      //console.log(this.chosenAddressId);
    }
  },
  components: {
    //'v-gologin': Gologin
  },
  computed: {
    carList () {
      return this.$store.state.detail.carList;
    },
  },
  mounted: function() {
    let t = this ;
    t.$nextTick(function() {
      //console.log(this.addressList);

    });
  },
  methods: {
    onAdd() {
      Toast('新增地址');
      this.$router.replace({
        path: '/AddressAdd',
        //params:{title:'添加地址'}
      });
    },
    onEdit(item, index) {
      //Toast('编辑地址:' + index);
      Toast('编辑地址');
      //this.modifyAddressId = item.id;
      //this.$router.replace({path: '/AddressModify',query: { id: this.modifyAddressId }});
      this.$router.push({
        name: '修改地址',
        params: {'addrID':item.id }
      })
    },
    onSelect(item, index) { // 设置默认发货信息（会员）
      //let paramsB = qs('id:41')
      //console.log(item, index);
      let t = this;
      let params = {addrID:item.id};
      t.$dataApi({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        url: '/api/member/updateAddress_default',
        data: params
      }).then((response) => {
        //console.log('onSelect：设置默认发货信息' + id);
        if (response.data.ret == 1) {
          Toast(response.data.msg);
          // this.getListAddress(); //重新获取地址列表信息
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    deleteAddress(addID){ // 删除发货信息（会员）
      //let paramsB = qs('id:41')
      let t = this;
      let params = {addrID:addID}
      t.$dataApi({
        //headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/deleteAddress',
        data: params
      }).then((response) => {
        console.log('删除地址成功！');
        this.getListAddress();
      }).catch(function(error) {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/fz.less";
.list {
  .van-button{
    bottom: 50px;
  }
}

</style>
