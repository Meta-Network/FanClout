import { createStore } from 'vuex'
import { state as userInfoState, mutations as userInfoMutations, actions as userInfoActions } from './user'

export default createStore({
  state: {
    ...userInfoState
  },
  mutations: {
    ...userInfoMutations
  },
  actions: {
    ...userInfoActions
  },
  modules: {
  }
})
