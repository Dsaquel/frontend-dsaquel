import router from '@/router'
import Cookies from 'js-cookie'
import ArrayService from '@/services/serviceArray'
import SnackBarService from '@/services/serviceSnackBar'
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

const Array = new ArrayService()
const Account = new AccountService()
const SnackBar = new SnackBarService()

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
  animes: (state) => Array.filter(state.stuff, 'anime'),
  mangas: (state) => Array.filter(state.stuff, 'manga')
}

const mutations = {
  [SET_LOGOUT]: (state) => {
    state.token = null
    state.email = null
    state.pseudo = null
  },
  [SET_LOADER]: (state, data) => {
    state.loader[Object.keys(data).toString()] = data[Object.keys(data)[0]]
  },
  [SET_STEP_AUTH]: (state, payload) => {
    state.newStep = payload.step
    state.emailRecupAccount = payload.email
  },
  [SET_USER_TOKEN]: (state, data) => {
    state.token = data
  },
  [SET_USER_STUFF]: (state, data) => {
    state.stuff = data
  },
  [SET_USER_INFORMATION]: (state, data) => {
    state.email = data.email
    state.pseudo = data.pseudo
  }
}

const actions = {
  [LOGIN]: async ({
    commit, dispatch
  }, payload) => {
    commit(SET_LOADER, { loginLoad: true })
    const token = await Account.login(payload)
    if (token.error && token.password) {
      const payload = { step: 'recupAccountPassword', email: token.email }
      commit(SET_STEP_AUTH, payload)
    } else if (token.error) {
      SnackBar.error(token.error)
    } else if (token.valid) {
      const payload = { step: 'recupAccountBtn', email: token.email }
      commit(SET_STEP_AUTH, payload)
    } else {
      dispatch(CHECK_COOKIE, token)
      const stuffOffline = JSON.parse(localStorage.getItem('userStuff'))
      if (stuffOffline === null) {
        SnackBar.success('connected')
      } else {
        stuffOffline.token = token
        const res = await Account.insertStuff(stuffOffline)
        if (res.error) {
          console.log(res.error)
        } else {
          SnackBar.success(res)
          localStorage.removeItem('userStuff')
        }
      }
    }
    commit(SET_LOADER, { loginLoad: false })
  },
  [LOGOUT]: ({ commit }, message) => {
    Cookies.remove('user', { path: '' })
    commit(SET_LOGOUT)
    SnackBar.error(message)
  },
  [SIGN_UP]: async ({
    commit
  }, newUser) => {
    commit(SET_LOADER, { registerLoad: true })
    const res = await Account.signUp(newUser)
    if (res.error && res.password) {
      const payload = { step: 'recupAccountPassword', email: res.email }
      commit(SET_STEP_AUTH, 'recupAccountPassword', payload)
    } else if (res.error) {
      SnackBar.error(res.error)
    } else if (res.valid) {
      const payload = { step: 'recupAccountBtn', email: res.email }
      commit(SET_STEP_AUTH, payload)
    } else {
      commit(SET_STEP_AUTH, { step: 'emailSend' })
      SnackBar.success(res)
    }
    commit(SET_LOADER, { registerLoad: false })
  },
  [RESEND_LINK]: async ({
    commit
  }, newUser) => {
    commit(SET_LOADER, { resendLinkLoad: true })
    const res = await Account.resendLink(newUser)
    if (res.error) {
      SnackBar.success(res.error)
    } else {
      SnackBar.success(res)
    }
    commit(SET_LOADER, { resendLinkLoad: false })
  },
  [CHECK_COOKIE]: ({ commit }, payload) => {
    const user = Cookies.get('user')
    if (user === undefined) {
      Cookies.set('user', payload, { expires: 365 })
      commit(SET_USER_TOKEN, payload)
    } else {
      commit(SET_USER_TOKEN, user)
    }
  },
  [RESET_PASSWORD]: async ({
    commit
  }, payload) => {
    commit(SET_LOADER, { resetPasswordLoad: true })
    const res = await Account.resetPassword(payload)
    if (res.error) {
      SnackBar.error(res.error)
      router.push('/')
    } else {
      SnackBar.success(res)
      router.push('/')
    }
    commit(SET_LOADER, { resetPasswordLoad: false })
  },
  [DELETE_ACCOUNT]: async ({ commit, state, dispatch }, email) => {
    const payload = {
      email,
      token: state.token
    }
    commit(SET_LOADER, { deleteAccountLoad: true })
    const res = await Account.deleteAccount(payload)
    if (res.err) {
      SnackBar.error(res.error)
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
  [GET_USER_STUFF]: async ({ commit, state }) => {
    const res = await Account.getUserStuff(state.token)
    if (res.error) {
      SnackBar.error(res.error)
    } else {
      commit(SET_USER_STUFF, res)
    }
  },
  [GET_USER_PROFILE]: async ({ commit, state }) => {
    const res = await Account.getUserProfile(state.token)
    if (res.error) {
      SnackBar.error(res.error)
    } else {
      commit(SET_USER_INFORMATION, res)
    }
  },
  [EDIT_USER_PROFILE]: async ({ commit, state }, payload) => {
    commit(SET_LOADER, { editUserProfile: true })
    payload.token = state.token
    const res = await Account.editUserProfile(payload)
    if (res.error) {
      SnackBar.error(res.error)
    } else {
      SnackBar.success(res)
    }
    commit(SET_LOADER, { editUserProfile: false })
  },
  async [DELETE_USER_STUFF] ({ commit, state }, _id) {
    const payload = { token: state.token, _id }
    const res = await Account.deleteUserStuff(payload)
    if (res.error) {
      SnackBar.error(res.error)
    } else {
      commit(SET_USER_STUFF, res)
    }
  },
  [EMAIL_CONFIRMATION]: async ({
    commit
  }, newUser) => {
    const res = await Account.emailConfirmation(newUser)
    if (res.error) {
      SnackBar.error(res.error)
    } else {
      SnackBar.success(res)
      router.push('/')
    }
  },
  [STAY_USER_CONNECTED]: async ({ commit }, userToken) => {
    commit(SET_USER_TOKEN, userToken)
    SnackBar.success('connected')
  },
  [LINK_PASSWORD_RESET]: async ({
    commit
  }, email) => {
    commit(SET_LOADER, { linkPasswordResetLoad: true })
    const res = await Account.linkPasswordReset({ email })
    if (res.error) {
      SnackBar.error(res.error)
    } else {
      SnackBar.success(res)
    }
    commit(SET_LOADER, { linkPasswordResetLoad: false })
  },
  [RECUP_ACCOUNT_BY_BTN]: async ({ commit, dispatch }, email) => {
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
      SnackBar.success('Account recovered')
    }
    commit(SET_LOADER, { recupAccountByBtnLoad: false })
  },
  [RECUP_ACCOUNT_BY_PASSWORD]: async ({ commit, dispatch }, payload) => {
    commit(SET_LOADER, { recupAccountByPasswordLoad: true })
    const res = await Account.recupAccountByPassword(payload)
    if (res.error) {
      SnackBar.error(res.error)
    } else {
      const step = {
        step: null, email: null
      }
      commit(SET_STEP_AUTH, step)
      dispatch(CHECK_COOKIE, res)
      SnackBar.success('Account recovered')
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
