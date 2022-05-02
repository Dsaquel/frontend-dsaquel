import Vue from 'vue'
import Vuex from 'vuex'
import Anime from './modules/anime'
import Character from './modules/character'
import Home from './modules/home'
import User from './modules/user'
import Manga from './modules/manga'
import Navigation from './modules/navigation'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    successSnackbar: false,
    errorSnackbar: false,
    message: null,
    isUserConnected: false,
    token: null,
    pseudo: null,
    email: null
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
    },
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
    stayUserConnected ({ commit }, userToken) {
      commit('setUserConnected', userToken)
      commit('setSuccessSnackbar', 'Connected')
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
      commit
    }, payload) {
      fetch(`${process.env.VUE_APP_API_URL}/api/auth/login`, {
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
          const data = await res.json()
          if (res.status === 200) {
            const payload = { cname: 'user', cvalue: data }
            this.dispatch('checkCookie', payload)
            const stuffOffline = JSON.parse(localStorage.getItem('userStuff'))
            if (stuffOffline === null) {
              commit('setSuccessSnackbar', 'Connected')
            } else {
              stuffOffline.token = data.token
              fetch(`${process.env.VUE_APP_API_URL}/api/stuff/insertStuff`, {
                method: 'post',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(stuffOffline)
              })
                .then(res => res.json())
                .then(message => commit('setSuccessSnackbar', message.message))
              localStorage.removeItem('userStuff')
            }
          } else {
            commit('setErrorSnackbar', data.error)
          }
        })
        .catch(error => console.log(error))
    },
    signUp ({
      commit
    }, newUser) {
      fetch(`${process.env.VUE_APP_API_URL}/api/auth/signup`, {
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
        .then(async res => {
          const data = await res.json()
          if (res.status === 200) {
            commit('setSuccessSnackbar', data.message)
          } else {
            commit('setErrorSnackbar', data.error)
          }
        })
        .catch(error => console.log(error))
    },
    emailConfirmation ({
      commit
    }, newUser) {
      fetch(`${process.env.VUE_APP_API_URL}/api/auth/confirmation/${newUser.email}/${newUser.token}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(async res => {
          const data = await res.json()
          if (res.status === 201) {
            commit('setSuccessSnackbar', data.message)
            router.push('/')
          } else {
            commit('setErrorSnackbar', data.error)
          }
        })
        .catch(error => console.log(error))
    },
    resendLink ({
      commit
    }, newUser) {
      fetch(`${process.env.VUE_APP_API_URL}/api/auth/resendLink`, {
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
        .then(async res => {
          const data = await res.json()
          if (res.status === 200) {
            commit('setSuccessSnackbar', data.message)
          } else {
            commit('setErrorSnackbar', data.error)
          }
        })
        .catch(error => console.log(error))
    },
    linkPasswordReset ({
      commit
    }, email) {
      fetch(`${process.env.VUE_APP_API_URL}/api/auth/linkPasswordReset`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      })
        .then(async res => {
          const data = await res.json()
          if (res.status === 200) {
            commit('setSuccessSnackbar', data.message)
          } else {
            commit('setErrorSnackbar', data.error)
          }
        })
        .catch(error => console.log(error))
    },
    resetPassword ({
      commit
    }, payload) {
      fetch(`${process.env.VUE_APP_API_URL}/api/auth/resetPassword`, {
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
      fetch(`${process.env.VUE_APP_API_URL}/api/auth/editUserProfile`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: this.state.token,
          pseudo: payload.pseudo
        })
          .then(async res => {
            const data = await res.json()
            if (res.status === 200) {
              commit('setSuccessSnackbar', data.message)
            } else {
              commit('setErrorSnackbar', data.error)
            }
          })
          .catch(error => console.log(error))
      })
    },
    async logout ({ commit, dispatch }) {
      dispatch('deleteCookie')
        .then(commit('logout'))
        .then(commit('setErrorSnackbar', 'Disconnected'))
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
