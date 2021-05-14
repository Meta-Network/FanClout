import { MTBT_TOKEN } from '../constants'
import { getMTBTPrice } from '../contracts'

/**
 * @typedef MetaCoin
 * @type {object}
 * @property {number} price - 价格
 * @property {string} address - Token 地址
 */

/**
 * @typedef MetaCoinState
 * @type {object}
 * @property {MetaCoin} metaCoin - MetaCoin 信息
 */

/**
 * 获取默认状态
 * @returns {MetaCoinState}
 */
const getDefaultState = () => {
  return {
    /**
     * @type {MetaCoin}
     */
    metaCoin: {
      price: 0,
      address: ''
    }
  }
}

export const state = getDefaultState()

export const getters = {
  /**
   * @param {MetaCoinState} state 状态
   * @returns {number}
   */
  mtbtPrice (state) {
    const price = Number(state.metaCoin.price.toFixed(3))
    console.log('METACOIN GETTERS::mtbtPrice', price)
    return price
  }
}

export const mutations = {
  /**
   * 设置 MetaCoin 信息
   * @param {MetaCoinState} state 状态
   * @param {MetaCoin} data 数据
   */
  setMetaCoinInfo (state, data) {
    state.metaCoin = { ...data }
  }
}

export const actions = {
  /**
   * 刷新用户
   * @param { import('vuex').ActionContext<MetaCoinState> } param0 - Action context
   */
  async getMetaCoinData ({ commit }) {
    const price = await getMTBTPrice()
    const data = {
      price,
      address: MTBT_TOKEN
    }
    commit('setMetaCoinInfo', data)
    console.log('METACOIN ACTIONS::getMetaCoinData', data)
  }
}
