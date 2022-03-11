import Vue from 'vue'
import Vuex from 'vuex'
import Mangas from './modules/mangas'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUserConnected: false
  },
  getters: {
  },
  mutations: {
    setUserConnected (state, isConnected) {
      state.isUserConnected = isConnected
    }
  },
  actions: {
  },
  modules: {
    Mangas
  }
})
