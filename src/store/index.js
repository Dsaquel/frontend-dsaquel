import Vue from 'vue'
import Vuex from 'vuex'
import Anime from './modules/anime'
import Character from './modules/character'
import Home from './modules/home'
import User from './modules/user'
import Manga from './modules/manga'
import Navigation from './modules/navigation'
import router from '@/router'
import Cookies from 'js-cookie'

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
    checkCookie ({ commit }, payload) {
      const user = Cookies.get('user')
      if (user === undefined) {
        Cookies.set('user', payload, { expires: 365 })
        commit('setUserConnected', payload)
      } else {
        commit('setUserConnected', user)
      }
    },
    login ({
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
            this.dispatch('checkCookie', data.token)
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
        .then(async res => {
          const data = await res.json()
          if (res.status === 200) {
            commit('setSuccessSnackbar', data.message)
            router.push('/')
          } else {
            commit('setErrorSnackbar', data.error)
            router.push('/')
          }
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
    async logout ({ commit }) {
      Cookies.remove('user', { path: '' })
      commit('logout')
      commit('setErrorSnackbar', 'Disconnected')
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
