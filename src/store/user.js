import { getMyUserData } from '../api/user'

/**
 * @typedef UserInfo
 * @type {object}
 * @property {number} id - 用户唯一 ID
 * @property {string} username - 用户名
 * @property {string} platform - 用户创建平台
 * @property {string} nickname - 用户昵称
 * @property {string} avatar - 用户头像
 */

/**
 * @typedef UserStoreState
 * @type {object}
 * @property {UserInfo} userInfo - 用户信息
 */

/**
 * 获取默认用户状态
 * @returns {UserStoreState}
 */
const getDefaultState = () => {
  return {
    /**
     * @type {UserInfo}
     */
    userInfo: {
      id: -1,
      username: '',
      platform: '',
      nickname: '',
      avatar: ''
    }
  }
}

export const state = getDefaultState

export const getters = {
  isLogined (state) {
    console.log('state.userInfo:', state.userInfo)
    return state.userInfo && state.userInfo.id && state.userInfo.id !== -1
  }
}

export const mutations = {
  /**
   * 重置用户信息
   * @param {UserStoreState} state 旧状态
   */
  resetUserInfo (state) {
    Object.assign(state, getDefaultState())
  },
  /**
   * 设置用户信息
   * @param {UserStoreState} state 旧状态
   * @param {UserInfo} data 新的用户信息
   */
  setUserInfo (state, data) {
    state.userInfo = { ...data }
  }
}

export const actions = {
  /**
   * 刷新用户
   * @param { import('vuex').ActionContext<UserStoreState> } param0 - Action context
   */
  async refreshUserData ({ commit }) {
    const data = await getMyUserData()
    commit('setUserInfo', data)
    console.log('USER ACTIONS::refreshUserData', data)
  }
}
