import Vue from 'vue'
import Vuex from 'vuex'
import Home from './modules/home'
import Anime from './modules/anime'
import Manga from './modules/manga'
import Account from './modules/account'
import Character from './modules/character'
import { SEND_MESSAGE } from '@/store/types/action-types'
import MailService from '@/services/extends/mailService'

Vue.use(Vuex)
const Mail = new MailService()

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
    async [SEND_MESSAGE] ({ commit }, payload) {
      const res = await Mail.sendMessage(payload)
      if (res.error) {
        commit('setErrorSnackbar', res.error)
      }
      commit('setSuccessSnackbar', res)
    }
  },
  modules: {
    Anime,
    Character,
    Home,
    Account,
    Manga
  }
})
