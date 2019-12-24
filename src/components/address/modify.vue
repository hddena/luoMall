<template>
  <!-- <div><h1>修改地址</h1></div> -->
  <van-address-edit
    :area-list="areaList"
    :address-info="addressInfo"
    show-delete
    show-postal
    show-set-default
    @save="onSave"
    @delete="onDelete"
  />
</template>

<script>
import Vue from 'vue';
import Util from '../../util/common.js';
import areaList from '../../util/area.js';
import { Toast , AddressEdit } from 'vant';
Vue.use(AddressEdit);

export default {
  data() {
    return {
      areaList,
      addressInfo: {
          addressDetail: null,
          areaCode: null,
          city: null,
          country: null,
          county: null,
          isDefault: null,
          name: null,
          postalCode: null,
          province: null,
          tel: null,
        },
    }
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
          this.getSingleAddress(); //获取某个发货信息（会员）
          //console.log(this.$route);
          //console.log(this.areaList);
      });
  },
  methods: {
    onSave(addVal) { //添加发货信息（会员）
      console.log(addVal);
      /*
      addressDetail: "清布村十九队"
      areaCode: "510800"
      city: "广东市"
      country: undefined
      county: "花都区"
      isDefault: true
      name: "陈汝平"
      postalCode: "510800"
      province: "北京市"
      tel: "13411173567"
      */
      this.trueName = addVal.name;
      this.phone = addVal.tel;
      this.postCode = addVal.areaCode
      this.addrDetail = addVal.city + addVal.county + addVal.addressDetail

      let t = this;
      let defAdd;
      if (t.isDefaultAddr) {
        defAdd = 1;
      } else {
        defAdd = 0;
      }
      let params = {
        trueName:this.trueName,
        mobile:this.phone,
        postCode:this.postCode,
        addrDetail:this.addrDetail,
        isDefault:defAdd,
        addrID:this.$route.query.id
      }
      //console.log(params);
      this.$dataApi({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        url: '/api/member/updateAddress',
        //params: params,
        data: params,
      }).then((response) => {
        let ret = response.data.ret ;
        console.log(response.data);
        if (ret == 1) {
          t.addAddressData = response.data.msg;
          //Util.setLocal(response.data.msg , 'addAddressData' )
          console.log(t.addAddressData);
          this.$router.replace({
            path: 'address'
          })
        } else {
          console.log(response.data.msg);
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    onDelete() {
      let t = this;
      let params = {addrID:this.$route.query.id};
      t.$dataApi({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        url: '/api/member/deleteAddress',
        data: params
      }).then((response) => {
        //console.log(addID);
        if (response.data.ret == 1) {
          Toast(response.data.msg);
          this.$router.replace({
            path: 'addressAll'
          })
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    getSingleAddress(){ //获取某个发货信息（会员）
      //let paramsB = qs('id:41')
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getSingleAddress',
        params: {
          addrID:this.$route.query.id
        }
      }).then((response) => {

        this.addressInfo.addressDetail = response.data.data.addrDetail;
        this.addressInfo.areaCode = response.data.data.postCode;
        this.addressInfo.country = '中国';
        this.addressInfo.province = '';
        this.addressInfo.city = '';
        this.addressInfo.county = '';
        this.addressInfo.isDefault = response.data.data.isDefault;
        this.addressInfo.name = response.data.data.trueName;
        this.addressInfo.postalCode = response.data.data.postCode;
        this.addressInfo.tel = response.data.data.mobile;
        
        console.log(response.data.data);
        console.log(this.addressInfo);
      }).catch(function(error) {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
