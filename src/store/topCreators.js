import { BigNumber } from 'ethers'
import creators from '../constants/TopCreators'
import { getPairContractByAddress, checkMTBTIsToken0, getMTBTPrice } from '../contracts'

/**
 * @typedef CreatorInfo
 * @type {object}
 * @property {string} name - 名字
 * @property {string} avatar - 头像
 * @property {number} price - 价格
 * @property {string} priceFormated - 格式化后的价格
 * @property {string} tokenAddress - Token 地址
 * @property {string} homepage - 主页
 */

/**
 * @typedef CreatorInfoState
 * @type {object}
 * @property {Array.<CreatorInfo>} creators - 创作者信息
 */

/**
 * 格式化价格
 * @param {Array.<CreatorInfo>} data 要格式化的数据
 * @returns {Array.<CreatorInfo>}
 */
const formatPrice = (data) => {
  if (!data) return []
  return data.map(c => ({
    ...c,
    priceFormated: new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(c.price)
  }))
}

/**
 * 获取默认状态
 * @returns {CreatorInfoState}
 */
const getDefaultState = () => {
  /**
   * @type {CreatorInfoState}
   */
  const state = {
    creators: []
  }
  console.log('TOPCREATORS STATE::getDefaultState', state)
  return state
}

export const state = getDefaultState()

export const getters = {
  /**
   * @param {CreatorInfoState} state 状态
   * @returns {Array.<CreatorInfo>}
   */
  topCreators (state) {
    const newData = formatPrice(state.creators)
    console.log('TOPCREATORS GETTERS::topCreators', newData)
    return newData
  },
  /**
   * @param {CreatorInfoState} state 状态
   * @returns {Array.<CreatorInfo>}
   */
  topCreatorsSorted (state) {
    const newData = formatPrice(state.creators).sort((i, j) => +(j.price > i.price) || +(j.price === i.price) - 1)
    console.log('TOPCREATORS GETTERS::topCreatorsSorted', newData)
    return newData
  }
}

export const mutations = {
  /**
   * 设置创作者信息
   * @param {CreatorInfoState} state 旧状态
   * @param {Array.<CreatorInfo>} data 新的创作者信息
   */
  setCreatorInfo (state, data) {
    state.creators = [...data]
  }
}

export const actions = {
  /**
   * 更新创作者信息
   * @param { import('vuex').ActionContext<Array.<CreatorInfo>> } param0 - Action context
   */
  async updateCreatorData ({ commit }) {
    /** @type {Array<CreatorInfo>} */
    const oldData = [...creators]
    const pendingNewData = oldData.map(async d => {
      if (d.tokenAddress) {
        const contract = getPairContractByAddress(d.tokenAddress)
        const isToken0 = await checkMTBTIsToken0(contract)
        const reserves = await contract.getReserves()
        const decimals = await contract.decimals()
        const mtbtPrice = await getMTBTPrice()
        if (isToken0) {
          const price = reserves._reserve0.div(BigNumber.from('10').pow(decimals)).toNumber() * mtbtPrice
          return {
            ...d,
            price
          }
        } else {
          const price = reserves._reserve1.div(BigNumber.from('10').pow(decimals)).toNumber() * mtbtPrice
          return {
            ...d,
            price
          }
        }
      } else {
        return d
      }
    })
    const newData = await Promise.all(pendingNewData)
    commit('setCreatorInfo', newData)
    console.log('TOPCREATORS ACTIONS::updateCreatorData', newData)
  }
}
