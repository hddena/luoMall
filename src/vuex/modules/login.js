import Util from '../../util/common'
import * as types from '../types'
const state = {
  token:1,
  userInfo:null
}

const mutations = {

  //Parameter组件选择参数
  [types.USER_INFO] (state,res) {
    state.userInfo = res
  },

  [types.CHANGE_TOKEN] (state,res) {
    state.token = res
  }

}


export default {
  state,
  mutations
}
