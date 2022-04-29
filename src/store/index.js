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
    token: null
  },
  getters: {},
  mutations: {
    setUserConnected (state, data) {
      state.isUserConnected = true
      state.token = data
    },
    logout (state) {
      state.isUserConnected = false
      state.token = null
    }

  },
  actions: {
    stayUserConnected ({ commit }, userToken) {
      commit('setUserConnected', userToken)
    },
    async checkCookie ({ commit, dispatch }, payload) {
      const user = await dispatch('getCookie', payload.cname)
      if (user !== '') {
        commit('setUserConnected', payload.cvalue.token)
      } else {
        if (user !== '' || user != null) {
          const newUser = { cname: payload.cname, cvalue: payload.cvalue.token, exp: 365 }
          await dispatch('setCookie', newUser)
          commit('setUserConnected', payload.cvalue.token)
        }
      }
    },
    setCookie ({ commit }, payload) {
      const d = new Date()
      d.setTime(d.getTime() + (payload.exp * 24 * 60 * 60 * 1000))
      const expires = 'expires=' + d.toUTCString()
      document.cookie = payload.cname + '=' + payload.cvalue + ';' + expires + ';path=/'
    },
    getCookie (cname) {
      const name = cname + '='
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    },
    deleteCookie () {
      document.cookie = 'user' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    },
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
            const payload = { cname: 'user', cvalue: data }
            this.dispatch('checkCookie', payload)
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
    async logout ({ commit, dispatch }) {
      dispatch('deleteCookie')
        .then(commit('logout'))
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
