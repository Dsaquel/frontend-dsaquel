
import {
  SET_ERROR_SNACKBAR,
  SET_SUCCESS_SNACKBAR
} from '@/store/types/mutation-types'

const state = {
  message: null,
  errorSnackbar: false,
  successSnackbar: false
}
const getters = {}

const mutations = {
  [SET_ERROR_SNACKBAR] (state, message) {
    state.errorSnackbar = true
    state.message = message
    setTimeout(() => { state.errorSnackbar = false }, 2000)
  },
  [SET_SUCCESS_SNACKBAR] (state, message) {
    state.successSnackbar = true
    state.message = message
    setTimeout(() => { state.successSnackbar = false }, 2000)
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
