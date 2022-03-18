const baseUrl = 'https://api.jikan.moe/v4'
const state = {
  mangas: [],
  isLoading: false,
  lastPageVisible: null,
  currentPage: 1,
  lastApiCall: ''
}

const getters = {}

const mutations = {
  setMangas (state, mangas) {
    state.mangas = mangas.data
    state.lastPageVisible = mangas.pagination.last_visible_page
    state.isLoading = false
  },
  // TODO: make it work
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setLastApiCall (url) {
    state.lastApiCall = url
  },
  updateMangas (state, mangas) {
    state.mangas = mangas.data
    state.isLoading = false
  }
}

const actions = {
  async getDefautMangas ({
    commit
  }) {
    commit('setLoading', true)
    const res = await fetch(`${baseUrl}/top/anime`)
    const data = await res.json()
    commit('setMangas', data)
  },
  async getSearchMangas ({
    commit
  }, searchQuery) {
    commit('setLoading', true)
    const res = await fetch(`${baseUrl}/anime?q=${searchQuery}&order_by=title&letter=${searchQuery}&sfw`)
    const data = await res.json()
    commit('setMangas', data)
  },
  async getGenreMangas ({
    commit
  }, idGenre) {
    commit('setLoading', true)
    const res = await fetch(`${baseUrl}/anime?genres=${idGenre}?&order_by=score&sort=desc&sfw`)
    const data = await res.json()
    commit('setMangas', data)
  },
  async getMangasPage ({ commit }, payload) {
    commit('setLoading', true)
    const res = await fetch(`${payload.url}?page=${payload.page}`)
    const data = res.json()
    commit('updateMangas', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
