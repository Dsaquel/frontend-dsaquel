import store from '@/store'

export default class serviceSnackBar {
  success (message) {
    return store.commit('setSuccessSnackbar', message)
  }

  error (error) {
    return store.commit('setErrorSnackbar', error)
  }
}
