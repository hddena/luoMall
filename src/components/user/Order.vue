<template>
  <section class="order">
    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link to="/Order"/>
    </van-cell-group>

    <van-row type="flex" class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
      <van-col span="6">
        <van-icon name="refund-o" />
        售后
      </van-col>
    </van-row>

  </section>
</template>

<script>

import { Row, Col, Icon, Cell, CellGroup } from 'vant';
export default {
  name:'User',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,

  },
  data(){
    return {

    }
  },
  props: {
    classList: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  mounted: function() {
    let t = this ;
    t.$nextTick(function() {
      //console.log(t.userInfo);
    });
  },
  methods:{
    getAmountCommission(){ // 获取当取用户佣金总额
      this.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/member/getAmountCommission',
        //url: '/mobile/index.php?m=console&c=view&a=view',
        params: {
          id:1,
          name:2
        }
      }).then((response) => {
        if (response.data.data) {
          this.amountCommission = response.data.data;
        } else {
          this.amountCommission = 0;
        }
        //console.log(response.data);
      }).catch(function(error) {
        //console.log(error)
      })
    },
  }
};
</script>
<style lang="less">
.order {
  margin-bottom: 10px;
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    /*margin-bottom: 15px;*/
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
      color: #dd9e58;
    }
  }
  .van-cell-group{
    margin-bottom: 0px;
  }
}
</style>