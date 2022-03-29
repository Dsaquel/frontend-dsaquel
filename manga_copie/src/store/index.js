import Vue from 'vue'
import Vuex from 'vuex'
import Anime from './modules/anime'
import Character from './modules/character'
import Home from './modules/home'
import Manga from './modules/manga'
import Navigation from './modules/navigation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      email: null,
      password: null
    },
    fakeDatabaseOfUser: [{
      id: 1,
      email: 'root@root.com',
      password: 'root'
    }]
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
    },
    insertUser (state, payload) {
      state.fakeDatabaseOfUser.push(payload)
    }
  },
  actions: {
    async checkUserExist ({
      commit,
      state
    }, payload) {
      if (state.fakeDatabaseOfUser.find(record => record.email === payload.email)) {
        commit('setUserConnected', payload)
      }
    },
    async insertUser ({
      commit
    }, payload) {
      commit('insertUser', payload)
    }
  },
  modules: {
    Anime,
    Character,
    Home,
    Manga,
    Navigation
  }
})
