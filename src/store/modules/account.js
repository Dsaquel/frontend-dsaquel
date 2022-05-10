import router from '@/router'
import Cookies from 'js-cookie'
import AccountService from '@/services/extends/accountService'
import {
  SET_LOGOUT,
  SET_USER_TOKEN,
  SET_USER_STUFF,
  SET_USER_INFORMATION
} from '@/store/types/mutation-types'
import {
  LOGIN,
  LOGOUT,
  SIGN_UP,
  RESEND_LINK,
  CHECK_COOKIE,
  RESET_PASSWORD,
  GET_USER_STUFF,
  GET_USER_PROFILE,
  EDIT_USER_PROFILE,
  DELETE_USER_STUFF,
  EMAIL_CONFIRMATION,
  STAY_USER_CONNECTED,
  LINK_PASSWORD_RESET
} from '@/store/types/action-types'

const Account = new AccountService()

const state = {
  stuff: [],
  token: null,
  email: null,
  pseudo: null
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
  async [LOGIN] ({
    commit, dispatch
  }, payload) {
    const token = await Account.login(payload)
    if (token.error) {
      this.commit('setErrorSnackbar', token.error)
    } else {
      dispatch(CHECK_COOKIE, token)
      const stuffOffline = JSON.parse(localStorage.getItem('userStuff'))
      if (stuffOffline === null) {
        this.commit('setSuccessSnackbar', 'Connected')
      } else {
        stuffOffline.token = token
        const res = await Account.insertStuff(stuffOffline)
        if (res.error) {
          console.log(res.error)
        } else {
          this.commit('setSuccessSnackbar', res)
          localStorage.removeItem('userStuff')
        }
      }
    }
  },
  [LOGOUT] ({ commit }) {
    Cookies.remove('user', { path: '' })
    commit(SET_LOGOUT)
    this.commit('setErrorSnackbar', 'Disconnected')
  },
  async [SIGN_UP] ({
    commit
  }, newUser) {
    const res = await Account.signUp(newUser)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      this.commit('setSuccessSnackbar', res)
    }
  },
  async [RESEND_LINK] ({
    commit
  }, newUser) {
    const res = await Account.resendLink(newUser)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      this.commit('setSuccessSnackbar', res)
    }
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
  async [RESET_PASSWORD] ({
    commit
  }, payload) {
    const res = await Account.resetPassword(payload)
    console.log(res)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
      router.push('/')
    } else {
      this.commit('setSuccessSnackbar', res)
      router.push('/')
    }
  },
  async [GET_USER_STUFF] ({ commit, state }) {
    const res = await Account.getUserStuff(state.token)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      commit(SET_USER_STUFF, res)
    }
  },
  async [GET_USER_PROFILE] ({ commit, state }) {
    const res = await Account.getUserProfile(state.token)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      commit(SET_USER_INFORMATION, res)
    }
  },
  async [EDIT_USER_PROFILE] ({ commit, state }, payload) {
    payload.token = state.token
    const res = await Account.editUserProfile(payload)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      this.commit('setSuccessSnackbar', res)
    }
  },
  async [DELETE_USER_STUFF] ({ commit, state }, _id) {
    const payload = { token: state.token, _id }
    const res = await Account.deleteUserStuff(payload)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      commit(SET_USER_STUFF, res)
    }
  },
  async [EMAIL_CONFIRMATION] ({
    commit
  }, newUser) {
    const res = await Account.emailConfirmation(newUser)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      this.commit('setSuccessSnackbar', res)
      router.push('/')
    }
  },
  [STAY_USER_CONNECTED] ({ commit }, userToken) {
    commit(SET_USER_TOKEN, userToken)
    this.commit('setSuccessSnackbar', 'Connected')
  },
  async [LINK_PASSWORD_RESET] ({
    commit
  }, email) {
    const res = await Account.linkPasswordReset({ email })
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      this.commit('setSuccessSnackbar', res)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
