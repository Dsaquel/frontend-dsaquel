import router from '@/router'
import Cookies from 'js-cookie'
import { SET_LOGOUT, SET_USER_TOKEN, SET_USER_STUFF, SET_USER_INFORMATION } from '@/store/types/mutation-types'
import { LOGIN, SIGN_UP, STAY_USER_CONNECTED, CHECK_COOKIE, EMAIL_CONFIRMATION, RESEND_LINK, LINK_PASSWORD_RESET, RESET_PASSWORD, GET_USER_PROFILE, EDIT_USER_PROFILE, LOGOUT, GET_USER_STUFF, DELETE_USER_STUFF } from '@/store/types/action-types'

const state = {
  stuff: [],
  token: null,
  pseudo: null,
  email: null
}

const getters = {
  animes (state) {
    const animes = state.stuff.filter(element => element.type === 'anime')
    const result = []
    animes.forEach(element => {
      const json = JSON.parse(element.data)
      json._id = element._id
      result.push(json)
    })
    return result
  },
  mangas () {
    const mangas = state.stuff.filter(element => element.type === 'manga')
    const result = []
    mangas.forEach(element => {
      const json = JSON.parse(element.data)
      json._id = element._id
      result.push(json)
    })
    return result
  }
}

const mutations = {
  [SET_LOGOUT] (state) {
    state.token = null
  },
  [SET_USER_TOKEN] (state, data) {
    state.token = data
  },
  [SET_USER_STUFF] (state, data) {
    state.stuff = data
  },
  [SET_USER_INFORMATION] (state, data) {
    state.email = data.email
    state.pseudo = data.pseudo
  }
}

const actions = {
  [LOGIN] ({
    commit, dispatch
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
          dispatch(CHECK_COOKIE, data.token)
          const stuffOffline = JSON.parse(localStorage.getItem('userStuff'))
          if (stuffOffline === null) {
            this.commit('setSuccessSnackbar', 'Connected')
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
              .then(message => this.commit('setSuccessSnackbar', message.message))
            localStorage.removeItem('userStuff')
          }
        } else {
          this.commit('setErrorSnackbar', data.error)
        }
      })
      .catch(error => console.log(error))
  },
  [LOGOUT] ({ commit }) {
    Cookies.remove('user', { path: '' })
    commit(SET_LOGOUT)
    this.commit('setErrorSnackbar', 'Disconnected')
  },
  [SIGN_UP] ({
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
          this.commit('setSuccessSnackbar', data.message)
        } else {
          this.commit('setErrorSnackbar', data.error)
        }
      })
      .catch(error => console.log(error))
  },
  [RESEND_LINK] ({
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
          this.commit('setSuccessSnackbar', data.message)
        } else {
          this.commit('setErrorSnackbar', data.error)
        }
      })
      .catch(error => console.log(error))
  },
  [CHECK_COOKIE] ({ commit }, payload) {
    const user = Cookies.get('user')
    if (user === undefined) {
      Cookies.set('user', payload, { expires: 365 })
      commit(SET_USER_TOKEN, payload)
    } else {
      commit(SET_USER_TOKEN, user)
    }
  },
  [RESET_PASSWORD] ({
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
          this.commit('setSuccessSnackbar', data.message)
          router.push('/')
        } else {
          this.commit('setErrorSnackbar', data.error)
          router.push('/')
        }
      })
  },
  [GET_USER_STUFF] ({ commit }) {
    fetch(`${process.env.VUE_APP_API_URL}/api/stuff/getUserStuff/${state.token}`, {
      method: 'get'
    })
      .then(res => res.json())
      .then(data => commit(SET_USER_STUFF, data))
      .catch(error => console.log(error))
  },
  [GET_USER_PROFILE] ({ commit, state }) {
    fetch(`${process.env.VUE_APP_API_URL}/api/auth/userProfile/${state.token}`, {
      method: 'get'
    })
      .then(res => res.json())
      .then(data => commit(SET_USER_INFORMATION, data))
  },
  [EDIT_USER_PROFILE] ({ commit, state }, payload) {
    fetch(`${process.env.VUE_APP_API_URL}/api/auth/editUserProfile`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: state.token,
        pseudo: payload.pseudo
      })
    })
      .then(async res => {
        const data = await res.json()
        if (res.status === 200) {
          this.commit('setSuccessSnackbar', data.message)
        } else {
          this.commit('setErrorSnackbar', data.error)
        }
      })
      .catch(error => console.log(error))
  },
  [DELETE_USER_STUFF] ({ commit, state }, _id) {
    fetch(`${process.env.VUE_APP_API_URL}/api/stuff/deleteUserStuff/${state.token}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id
      })
    }).then(res => res.json())
      .then(data => commit(SET_USER_STUFF, data))
  },
  [EMAIL_CONFIRMATION] ({
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
          this.commit('setSuccessSnackbar', data.message)
          router.push('/')
        } else {
          this.commit('setErrorSnackbar', data.error)
        }
      })
      .catch(error => console.log(error))
  },
  [STAY_USER_CONNECTED] ({ commit }, userToken) {
    commit(SET_USER_TOKEN, userToken)
    this.commit('setSuccessSnackbar', 'Connected')
  },
  [LINK_PASSWORD_RESET] ({
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
          this.commit('setSuccessSnackbar', data.message)
        } else {
          this.commit('setErrorSnackbar', data.error)
        }
      })
      .catch(error => console.log(error))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
