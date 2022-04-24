import Vue from 'vue'
import Vuex from 'vuex'
import Anime from './modules/anime'
import Character from './modules/character'
import Home from './modules/home'
import User from './modules/user'
import Manga from './modules/manga'
import Navigation from './modules/navigation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUserConnected: false,
    token: null,
    email: null,
    pseudo: null
  },
  getters: {},
  mutations: {
    setUserConnected (state, data) {
      state.isUserConnected = true
      state.token = data.token
      state.email = data.email
      state.pseudo = data.pseudo
    },
    setUserDisconnected (state) {
      state.isUserConnected = false
    }
  },
  actions: {
    async login ({
      commit,
      state
    }, payload) {
      fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password
        })
      })
        .then(async res => {
          if (res.status === 200) {
            const data = await res.json()
            commit('setUserConnected', data)
          } else {
            console.log('t\'es pas le bienvenu toi')
          }
        })
        .catch(error => console.log(error))
    },
    async signUp ({
      commit
    }, newUser) {
      fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
          pseudo: newUser.pseudo
        })
      })
        .then(console.log('send mail confirmation'))
        .catch(error => console.log(error))
    },
    emailConfirmation ({
      commit
    }, newUser) {
      fetch(`http://localhost:3000/api/auth/confirmation/${newUser.email}/${newUser.token}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json()) // 2
        .then((message) => {
          console.log(message.message) // 3
        })
        .catch(error => console.log(error))
    },
    resendLink ({
      commit
    }, newUser) {
      fetch('http://localhost:3000/api/auth/resendLink', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
          pseudo: newUser.pseudo
        })
      })
    },
    linkPasswordReset ({
      commit
    }, email) {
      fetch('http://localhost:3000/api/auth/linkPasswordReset', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      })
    },
    resetPassword ({
      commit
    }, payload) {
      fetch('http://localhost:3000/api/auth/resetPassword', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: payload.email,
          token: payload.token,
          password: payload.password
        })
      })
    },
    editUserProfile ({ commit }, payload) {
      fetch('http://localhost:3000/api/auth/editUserProfile', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.token,
          pseudo: payload.pseudo
        })
      })
    },
    logout ({ commit }) {
      commit('setUserDisconnected')
    }
  },
  modules: {
    Anime,
    Character,
    Home,
    User,
    Manga,
    Navigation
  }
})
