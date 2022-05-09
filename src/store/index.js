import Vue from 'vue'
import Vuex from 'vuex'
import Anime from './modules/anime'
import Character from './modules/character'
import Home from './modules/home'
import Account from './modules/account'
import Manga from './modules/manga'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    successSnackbar: false,
    errorSnackbar: false,
    message: null
  },
  getters: {},
  mutations: {
    setSuccessSnackbar (state, message) {
      state.successSnackbar = true
      state.message = message
      setTimeout(() => { state.successSnackbar = false }, 2000)
    },
    setErrorSnackbar (state, message) {
      state.errorSnackbar = true
      state.message = message
      setTimeout(() => { state.errorSnackbar = false }, 2000)
    }
  },
  actions: {
  },
  modules: {
    Anime,
    Character,
    Home,
    Account,
    Manga
  }
})
