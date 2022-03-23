const baseUrl = 'https://api.jikan.moe/v4'
const state = {
  mangas: [],
  manga: null,
  mangasListContent: null,
  lastPageVisible: null
}

const getters = {}

const mutations = {
  // setListContent (state, data) {
  //   state.mangasListContent = {
  //     data: data.data.data,
  //     name: data.name
  //   }
  //   state.lastPageVisible = data.data.pagination.last_visible_page
  // }
  setManga (state, manga) {
    state.manga = manga
  }
}

const actions = {
  async getManga ({ commit }, id) {
    const res = await fetch(`${baseUrl}/manga/${id}`)
    const data = await res.json()
    commit('setManga', data.data)
  }
  // async getMangaList ({
  //   commit
  // }, path) {
  //   const res = await fetch(`${baseUrl}/${path}`)
  //   const data = await res.json()
  //   const expansion = {
  //     data: data,
  //     name: path
  //   }
  //   commit('setListContent', expansion)
  //   const url = new URL(`${baseUrl}/${path}`)
  //   localStorage.setItem('url', url)
  // },
  // async getMangasPage ({
  //   commit
  // }, page) {
  //   const url = localStorage.getItem('url')
  //   const res = await fetch(`${url}?&page=${page}`)
  //   const data = await res.json()
  //   commit('setListContent', { data: data })
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
