import { BigNumber } from 'ethers'
import creators from '../constants/TopCreators'
import { getPairContractByAddress, checkMTBTIsToken0, getMTBTPrice } from '../contracts'
import { MTBT_TOKEN } from '../constants'

/**
 * @typedef MastodonInfo
 * @type {object}
 * @property {string} domain
 * @property {string} username
 */

/**
 * @typedef VerifiedInfo
 * @type {object}
 * @property {string} twitter_name
 * @property {string} bilibili_id
 * @property {?MastodonInfo} mastodon_uesr
 */

/**
 * @typedef CreatorInfo
 * @type {object}
 * @property {string} name - 名字
 * @property {string} avatar - 头像
 * @property {number} price - 价格
 * @property {string} priceFormated - 格式化后的价格
 * @property {string} buyUrl - 购买地址
 * @property {string} sellUrl - 销售地址
 * @property {string} tokenAddress - Token 地址
 * @property {string} pairAddress - Pair 地址
 * @property {string} homepage - 主页
 * @property {?VerifiedInfo} verified - 认证信息
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
 * 创建销售 URL
 * @param {string} url - URL 链接
 * @param {string} token - 用户的 Token
 * @param {string} mtbt - MTBT 的地址
 */
const createUrl = (url, token, mtbt = MTBT_TOKEN) => {
  const buyUrl = url.replace('T0', mtbt).replace('T1', token)
  const sellUrl = url.replace('T0', token).replace('T1', mtbt)
  return {
    buyUrl,
    sellUrl
  }
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
    const rawData = [...creators]
    const oldData = rawData.map(d => {
      if (d.tokenAddress) {
        const urls = createUrl(d.buyUrl, d.tokenAddress)
        return {
          ...d,
          ...urls
        }
      } else {
        return d
      }
    })
    const pendingNewData = oldData.map(async d => {
      if (d.pairAddress) {
        const contract = getPairContractByAddress(d.pairAddress)
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
