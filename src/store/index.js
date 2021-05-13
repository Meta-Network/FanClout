import { createStore } from 'vuex'
import { state as userInfoState, getters as userInfoGetters, mutations as userInfoMutations, actions as userInfoActions } from './user'
import { state as topCreatorsState, getters as topCreatorsGetters, mutations as topCreatorsMutations, actions as topCreatorsActions } from './topCreators'
import ethers from './ethers'

export default createStore({
  state: {
    ...userInfoState,
    ...topCreatorsState
  },
  getters: {
    ...userInfoGetters,
    ...topCreatorsGetters
  },
  mutations: {
    ...userInfoMutations,
    ...topCreatorsMutations
  },
  actions: {
    ...userInfoActions,
    ...topCreatorsActions
  },
  modules: {
    ethers
  }
})
