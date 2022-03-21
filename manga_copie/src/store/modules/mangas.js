const baseUrl = 'https://api.jikan.moe/v4'
const state = {
  homeContent: [],
  mangasListContent: null,
  isLoading: false,
  lastPageVisible: null,
  mangaList: ''
}

const getters = {}

const mutations = {
  setMangas (state, data) {
    state.homeContent.push({
      name: data.name,
      data: data.data,
      promise: data.promise
    })
    state.isLoading = false
  },
  // TODO: make it work
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setListContent (state, data) {
    state.mangasListContent = data.data
    console.log(data)
    console.log(data.data)
    state.lastPageVisible = data.pagination.last_visible_page
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
          data: data.data,
          promise: promise.promise
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
  async getMangaList ({ commit }, path) {
    const url = new URL(`${baseUrl}/${path}`)
    localStorage.setItem('url', url)
    const res = await fetch(`${baseUrl}/${path}`)
    const data = await res.json()
    commit('setListContent', data)
  },
  async getMangasPage ({
    commit
  }, page) {
    commit('setLoading', true)
    const url = localStorage.getItem('url')
    const res = await fetch(`${url}?&page=${page}`)
    const data = await res.json()
    commit('setListContent', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
