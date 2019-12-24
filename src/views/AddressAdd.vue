<template>
  <section>
    <v-navbar/>
  <van-address-edit
    :area-list="areaList"
    show-postal
    show-set-default
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
  />
    <v-divider/>
    <v-tabbar/>
</section>
</template>

<script>

import NavBar from '@/common/NavBar';
import Divider from '@/common/Divider';
import Tabbar from '@/common/Tabbar';

import Vue from 'vue';
import Util from '../util/common.js';
import areaList from '../util/area.js';
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

export default {
  data() {
    return {
      areaList,
      searchResult: [],

      trueName:null,
      phone:null,
      postCode:null,
      addrDetail:null,
      addAddressData:null,
      //isDefault:false
      isDefaultAddr:true

    }
  },
  components: {
    'v-navbar': NavBar,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  mounted: function() {
      let t = this ;
      t.$nextTick(function() {
          //t.getAreaList();
          console.log(this.areaList);
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
      //this.postCode = addVal.postalCode
      this.addrDetail = addVal.city + addVal.county + addVal.addressDetail

      let t = this;
      let defAdd;
      if (t.isDefaultAddr) {
        defAdd = 1;
      } else {
        defAdd = 0;
      }

      let params = {
        mobile:this.phone,
        postCode:this.postCode,
        addrDetail:this.addrDetail,
        trueName:this.trueName,
        isDefault:defAdd
      }
      console.log(params);

      this.$dataApi({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        url: '/api/member/addAddress',
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
    onDelete(val) {
      //Toast('delete');
      console.log(val);
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '',
          address: ''
        }];
      } else {
        this.searchResult = [];
      }
      console.log(val);
    },
    getAreaList(){
      //let paramsB = qs('id:41')
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/product/getProDetail',
        params: {
          //proID:this.$route.params.id
        }
      }).then((response) => {
        //this.detail = response.data.data;
        console.log(response);
      }).catch(function(error) {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
