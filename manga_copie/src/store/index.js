import Vue from 'vue'
import Vuex from 'vuex'
import Mangas from './modules/mangas'
import Navigation from './modules/navigation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      email: null,
      password: null
    },
    fakeDatabaseOfUser: {
      id: 1,
      email: 'root@root.com',
      password: 'root'
    },
    isNavigationDrawerOpened: false
  },
  getters: {
    isUserConnected (state) {
      if (state.user.id !== null) {
        return true
      } else {
        return false
      }
    }
  },
  mutations: {
    // TODO: put data of user temporaly in vuex & create user!!
    setUserConnected (state, payload) {
      state.user.id = 1
      state.user.email = payload.email
      state.user.password = payload.password
    }
  },
  actions: {
    // TODO: check db if user exist
    async checkUserExist ({
      commit,
      state
    }, payload) {
      if (state.fakeDatabaseOfUser.email === payload.email && state.fakeDatabaseOfUser.password === payload.password) {
        commit('setUserConnected', payload)
      }
    }
  },
  modules: {
    Mangas,
    Navigation
  }
})
