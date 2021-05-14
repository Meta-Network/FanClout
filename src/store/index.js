import { createStore } from 'vuex'
import { state as userInfoState, getters as userInfoGetters, mutations as userInfoMutations, actions as userInfoActions } from './user'
import { state as topCreatorsState, getters as topCreatorsGetters, mutations as topCreatorsMutations, actions as topCreatorsActions } from './topCreators'
import { state as metaCoinState, getters as metaCoinGetters, mutations as metaCoinMutations, actions as metaCoinActions } from './metaCoin'
import ethers from './ethers'

export default createStore({
  state: {
    ...userInfoState,
    ...topCreatorsState,
    ...metaCoinState
  },
  getters: {
    ...userInfoGetters,
    ...topCreatorsGetters,
    ...metaCoinGetters
  },
  mutations: {
    ...userInfoMutations,
    ...topCreatorsMutations,
    ...metaCoinMutations
  },
  actions: {
    ...userInfoActions,
    ...topCreatorsActions,
    ...metaCoinActions
  },
  modules: {
    ethers
  }
})
