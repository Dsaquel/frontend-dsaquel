const baseUrl = 'https://api.jikan.moe/v4'
const state = {
  homeContent: [],
  isLoading: false,
  lastPageVisible: null
}

const getters = {}

const mutations = {
  setMangas (state, data) {
    state.homeContent.push({
      name: data.name,
      data: data.data
    })
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
    const promises = [{
      promise: 'top/manga',
      name: 'Top manga'
    }, {
      promise: 'top/anime',
      name: 'Top anime'
    }, {
      promise: 'top/characters',
      name: 'Meilleurs personnages'
    }]

    await Promise.all(
      promises.map(async (promise) => {
        const res = await fetch(`${baseUrl}/${promise.promise}`)
        const data = await res.json()
        const expansion = {
          name: promise.name,
          data: data.data
        }
        commit('setMangas', expansion)
      })
    )
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
  async getMangasPage ({
    commit
  }, page) {
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
