<template lang="html">
    <div class="address">
      <v-navbar/>
      <!-- <router-view :addressList="listAddress"/> -->
      <v-list :addressList="listAddress"/>
      <v-divider/>
      <v-tabbar/>
    </div>
</template>

<script>
import NavBar from '@/common/navBar/navBar'
import Nothing from '@/components/address/nothing'
import List from '@/components/address/List'
import Divider from '@/common/Divider'
import Tabbar from '@/common/Tabbar'
import Util from '../util/common.js'

export default {
  data() {
    return {
      // pageTitle:'收货地址',
      listAddress:null,
      title:'收货地址321',
      //showFooter:true
      isRouterAlive:true
    }
  },
  components:{
    'v-navbar': NavBar,
    'v-nothing':Nothing,
    'v-list':List,
    'v-divider': Divider,
    'v-tabbar': Tabbar,
  },
  computed:{
    pageTitle(){
      return this.$route.name
    },
    imgPath(){
      return this.$store.state.category.imgPath
    },
    showFooter(){
      if (this.$route.path == "/addressAll") {
        return true
      } else {
        return false
      }
    },
  },

  mounted: function() {
    let t = this ;
    t.$nextTick(function() {
      t.getListAddress();
      console.log(this.$route)
    });
  },
  methods: {
    reload(){ // 刷新
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
    getListAddress(){ // 获取发货列表（会员）
      //let paramsB = qs('id:41')
      let t = this;
      let url = '/api/member/getListAddress';
      //let dataObj = 'listAddress';
      let params = {'id':1,'name':2}
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: url,
        params: params
      }).then((response) => {
        //let addrList = new Object();
        /*
        id  每条地址的唯一标识   string | number
        name  收货人姓名   string
        tel   收货人手机号  string | number
        address   收货地址  string
        */
        // 先将json对象转为json字符串，再替换你要替换的属性名，最后再转为json对象
        let addAll = JSON.parse(JSON.stringify(response.data.data).replace(/addrID/g,"id").replace(/trueName/g,"name").replace(/mobile/g,"tel").replace(/addrDetail/g,"address"));
        /*
        for (var i = 0; i < addAll.length; i++) {
          if (addAll[i].isDefault) {
            this.chosenAddressId = addAll[i].id;
          }
        }
        */
        this.listAddress = addAll;
        //t.listAddress = response.data.data;
        //console.log(t.listAddress);
      }).catch(function(error) {
        console.log(error)
      })
    },
  }

}
</script>

<style lang="less" scoped>
.address {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
