const baseUrl = 'https://api.jikan.moe/v4'
const state = {
  mangas: [],
  isLoading: false
}

const getters = {

}

const mutations = {
  setMangas (state, mangas) {
    state.mangas = mangas
    state.isLoading = false
  }
}

const actions = {
  async getDefautMangas ({ commit, state }) {
    state.isLoading = true
    const res = await fetch(`${baseUrl}/top/anime`)
    const data = await res.json()
    commit('setMangas', data.data)
  },
  async getSearchMangas ({ commit }, searchQuery) {
    state.isLoading = true
    const res = await fetch(`${baseUrl}/anime?q=${searchQuery}&order_by=title&letter=${searchQuery}&sfw`)
    const data = await res.json()
    commit('setMangas', data.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
