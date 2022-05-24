import Vue from 'vue'
import Vuex from 'vuex'
import Home from './modules/home'
import Anime from './modules/anime'
import Manga from './modules/manga'
import Account from './modules/account'
import Snackbar from './modules/snackbar'
import Character from './modules/character'
import { SEND_MESSAGE } from '@/store/types/action-types'
import MailService from '@/services/extends/mailService'
import SnackBarService from '@/services/serviceSnackBar'

const SnackBar = new SnackBarService()

Vue.use(Vuex)
const Mail = new MailService()

export default new Vuex.Store({
  actions: {
    [SEND_MESSAGE]: async ({ commit }, payload) => {
      const res = await Mail.sendMessage(payload)
      res.error
        ? SnackBar.error(res.error)
        : SnackBar.success(res)
    }
  },
  modules: {
    Anime,
    Character,
    Home,
    Account,
    Snackbar,
    Manga
  }
})
