import Util from '../../util/common'
import * as types from '../types'

const state = {
	tabIndex:0,
	imgPath:{
		// 图片路径 小
		imgSmall:'http://store.cmsya.com/upload/product/small/',
		// 图片路径 中
		imgMiddle:'http://store.cmsya.com/upload/product/middle/',
		// 图片路径 大
		imgBig:'http://store.cmsya.com/upload/product/big/',
		// 图片路径 原
		imgPre:'http://store.cmsya.com/upload/product/pre/',
		// 图片路径 广告
		imgAdv:'http://store.cmsya.com/upload/advertisement/'
	},
	classList:null, // 分类列表
	proList:null,  // 商品列表
	advertisement:null
}

const mutations = {
  [types.ADV_LIST] (state,res) {
    state.advertisement = res
  },
  [types.PRO_LIST] (state,res) {
    state.proList = res
  },
  [types.CHANGE_TABINDEX] (state,res) {
    state.tabIndex = res
  }
}


export default {
  state,
  mutations
}
