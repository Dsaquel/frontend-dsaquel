const baseUrl = 'https://api.jikan.moe/v4'
const state = {
  mangas: [],
  filters: [],
  isLoading: false
}

const getters = {
}

const mutations = {
  setMangas (state, mangas) {
    state.mangas = mangas
    state.isLoading = false
  },
  setFilters (state, filters) {
    state.filters = filters
    state.isLoading = false
  }
}

const actions = {
  async getDefautMangas ({
    commit,
    state
  }) {
    state.isLoading = true
    const res = await fetch(`${baseUrl}/top/anime`)
    const data = await res.json()
    commit('setMangas', data.data)
  },
  async getSearchMangas ({
    commit,
    state
  }, searchQuery) {
    state.isLoading = true
    const res = await fetch(`${baseUrl}/anime?q=${searchQuery}&order_by=title&letter=${searchQuery}&sfw`)
    const data = await res.json()
    commit('setMangas', data.data)
  },
  async setGenreMangas ({
    commit
  }) {
    const res = await fetch(`${baseUrl}/genres/anime?filter=genres`)
    console.log(res)
    const data = await res.json()
    console.log(data)
    const arrayData = await data.data.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i)
    commit('setFilters', arrayData)
  },
  async getGenreMangas ({
    commit,
    state
  }, idGenre) {
    state.isLoading = true
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