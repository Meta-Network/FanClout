import { createStore } from 'vuex'
import { state as userInfoState, getters as userInfoGetters, mutations as userInfoMutations, actions as userInfoActions } from './user'
import ethers from './ethers'

export default createStore({
  state: {
    ...userInfoState
  },
  getters: {
    ...userInfoGetters
  },
  mutations: {
    ...userInfoMutations
  },
  actions: {
    ...userInfoActions
  },
  modules: {
    ethers
  }
})
