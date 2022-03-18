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
  },
  // TODO: make it work
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  }
}

const actions = {
  async getDefautMangas ({
    commit
  }) {
    commit('setLoading', true)
    const res = await fetch(`${baseUrl}/top/anime`)
    const data = await res.json()
    commit('setMangas', data.data)
  },
  async getSearchMangas ({ commit }, searchQuery) {
    commit('setLoading', true)
    const res = await fetch(`${baseUrl}/anime?q=${searchQuery}&order_by=title&letter=${searchQuery}&sfw`)
    const data = await res.json()
    commit('setMangas', data.data)
  },
  async getGenreMangas ({
    commit
  }, idGenre) {
    commit('setLoading', true)
    const res = await fetch(`${baseUrl}/anime?genres=${idGenre}?&order_by=score&sort=desc&sfw`)
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
