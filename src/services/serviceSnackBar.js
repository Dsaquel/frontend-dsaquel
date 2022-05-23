import store from '@/store'
import { SET_SUCCESS_SNACKBAR, SET_ERROR_SNACKBAR } from '@/store/types/mutation-types'
export default class serviceSnackBar {
  success = (message) => {
    return store.commit('Snackbar/' + SET_SUCCESS_SNACKBAR, message, { root: true })
  }

  error = (error) => {
    return store.commit('Snackbar/' + SET_ERROR_SNACKBAR, error, { root: true })
  }
}
