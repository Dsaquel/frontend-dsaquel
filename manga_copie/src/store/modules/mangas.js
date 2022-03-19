const baseUrl = 'https://api.jikan.moe/v4'
const state = {
  mangas: [],
  isLoading: false,
  lastPageVisible: null
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
  }
}

const actions = {
  async getDefautMangas ({
    commit
  }) {
    commit('setLoading', true)
    const url = new URL(`${baseUrl}/top/anime`)
    localStorage.setItem('url', url)
    const res = await fetch(`${baseUrl}/top/anime`)
    const data = await res.json()
    commit('setMangas', data)
  },
  async getSearchMangas ({
    commit
  }, searchQuery) {
    commit('setLoading', true)
    const url = new URL(`${baseUrl}/anime?q=${searchQuery}&order_by=title&letter=${searchQuery}&sfw`)
    localStorage.setItem('url', url)
    const res = await fetch(`${baseUrl}/anime?q=${searchQuery}&order_by=title&letter=${searchQuery}&sfw`)
    const data = await res.json()
    commit('setMangas', data)
  },
  async getGenreMangas ({
    commit
  }, idGenre) {
    commit('setLoading', true)
    const url = new URL(`${baseUrl}/anime?genres=${idGenre}?&order_by=score&sort=desc&sfw`)
    localStorage.setItem('url', url)
    const res = await fetch(`${baseUrl}/anime?genres=${idGenre}?&order_by=score&sort=desc&sfw`)
    const data = await res.json()
    commit('setMangas', data)
  },
  async getMangasPage ({ commit }, page) {
    commit('setLoading', true)
    const url = localStorage.getItem('url')
    const res = await fetch(`${url}?&page=${page}`)
    const data = await res.json()
    commit('setMangas', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
