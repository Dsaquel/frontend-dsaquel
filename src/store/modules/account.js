import router from '@/router'
import Cookies from 'js-cookie'
import AccountService from '@/services/extends/accountService'
import {
  SET_LOGOUT,
  SET_LOADER,
  SET_STEP_AUTH,
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
  DELETE_ACCOUNT,
  GET_USER_STUFF,
  GET_USER_PROFILE,
  EDIT_USER_PROFILE,
  DELETE_USER_STUFF,
  EMAIL_CONFIRMATION,
  STAY_USER_CONNECTED,
  LINK_PASSWORD_RESET,
  RECUP_ACCOUNT_BY_BTN,
  RECUP_ACCOUNT_BY_PASSWORD
} from '@/store/types/action-types'

const Account = new AccountService()

const state = {
  stuff: [],
  token: null,
  email: null,
  loader: {
    loginLoad: false,
    registerLoad: false,
    resendLinkLoad: false,
    editUserProfile: false,
    resetPasswordLoad: false,
    deleteAccountLoad: false,
    linkPasswordResetLoad: false,
    recupAccountByBtnLoad: false,
    recupAccountByPasswordLoad: false
  },
  pseudo: null,
  newStep: null,
  emailRecupAccount: null
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
    state.email = null
    state.pseudo = null
  },
  [SET_LOADER] (state, data) {
    state.loader[Object.keys(data).toString()] = data[Object.keys(data)[0]]
  },
  [SET_STEP_AUTH] (state, payload) {
    state.newStep = payload.step
    state.emailRecupAccount = payload.email
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
    commit(SET_LOADER, { loginLoad: true })
    const token = await Account.login(payload)
    if (token.error && token.password) {
      const payload = { step: 'recupAccountPassword', email: token.email }
      commit(SET_STEP_AUTH, payload)
    } else if (token.error) {
      this.commit('setErrorSnackbar', token.error)
    } else if (token.valid) {
      const payload = { step: 'recupAccountBtn', email: token.email }
      commit(SET_STEP_AUTH, payload)
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
    commit(SET_LOADER, { loginLoad: false })
  },
  [LOGOUT] ({ commit }, message) {
    Cookies.remove('user', { path: '' })
    commit(SET_LOGOUT)
    this.commit('setErrorSnackbar', message)
  },
  async [SIGN_UP] ({
    commit
  }, newUser) {
    commit(SET_LOADER, { registerLoad: true })
    const res = await Account.signUp(newUser)
    if (res.error && res.password) {
      const payload = { step: 'recupAccountPassword', email: res.email }
      commit(SET_STEP_AUTH, 'recupAccountPassword', payload)
    } else if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else if (res.valid) {
      const payload = { step: 'recupAccountBtn', email: res.email }
      commit(SET_STEP_AUTH, payload)
    } else {
      commit(SET_STEP_AUTH, { step: 'emailSend' })
      this.commit('setSuccessSnackbar', res)
    }
    commit(SET_LOADER, { registerLoad: false })
  },
  async [RESEND_LINK] ({
    commit
  }, newUser) {
    commit(SET_LOADER, { resendLinkLoad: true })
    const res = await Account.resendLink(newUser)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      this.commit('setSuccessSnackbar', res)
    }
    commit(SET_LOADER, { resendLinkLoad: false })
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
    commit(SET_LOADER, { resetPasswordLoad: true })
    const res = await Account.resetPassword(payload)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
      router.push('/')
    } else {
      this.commit('setSuccessSnackbar', res)
      router.push('/')
    }
    commit(SET_LOADER, { resetPasswordLoad: false })
  },
  async [DELETE_ACCOUNT] ({ commit, state, dispatch }, email) {
    const payload = {
      email,
      token: state.token
    }
    commit(SET_LOADER, { deleteAccountLoad: true })
    const res = await Account.deleteAccount(payload)
    if (res.err) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      const step = {
        step: null, email: null
      }
      commit(SET_STEP_AUTH, step)
      dispatch(LOGOUT, res)
      router.push('/?account=deleted')
    }
    commit(SET_LOADER, { deleteAccountLoad: false })
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
    commit(SET_LOADER, { editUserProfile: true })
    payload.token = state.token
    const res = await Account.editUserProfile(payload)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      this.commit('setSuccessSnackbar', res)
    }
    commit(SET_LOADER, { editUserProfile: false })
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
    commit(SET_LOADER, { linkPasswordResetLoad: true })
    const res = await Account.linkPasswordReset({ email })
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      this.commit('setSuccessSnackbar', res)
    }
    commit(SET_LOADER, { linkPasswordResetLoad: false })
  },
  async [RECUP_ACCOUNT_BY_BTN] ({ commit, dispatch }, email) {
    commit(SET_LOADER, { recupAccountByBtnLoad: true })
    const payload = { email }
    const res = await Account.recupAccountByBtn(payload)
    if (res.error) {
      console.log(res.error)
    } else {
      const step = {
        step: null, email: null
      }
      commit(SET_STEP_AUTH, step)
      dispatch(CHECK_COOKIE, res)
      this.commit('setSuccessSnackbar', 'Account recovered')
    }
    commit(SET_LOADER, { recupAccountByBtnLoad: false })
  },
  async [RECUP_ACCOUNT_BY_PASSWORD] ({ commit, dispatch }, payload) {
    commit(SET_LOADER, { recupAccountByPasswordLoad: true })
    const res = await Account.recupAccountByPassword(payload)
    if (res.error) {
      this.commit('setErrorSnackbar', res.error)
    } else {
      const step = {
        step: null, email: null
      }
      commit(SET_STEP_AUTH, step)
      dispatch(CHECK_COOKIE, res)
      this.commit('setSuccessSnackbar', 'Account recovered')
    }
    commit(SET_LOADER, { recupAccountByPasswordLoad: false })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
