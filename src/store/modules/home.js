const baseUrl = 'https://api.jikan.moe/v4'

const state = {
  animeUpcoming: null,
  topManga: null,
  topCharacters: null
}

const getters = {

}

const mutations = {
  setHomePageContent (state, data) {
    if (data.name === 'topManga') {
      state.topManga = data.data
    }
    if (data.name === 'animeUpcoming') {
      state.animeUpcoming = data.data
    }
    if (data.name === 'topCharacters') {
      state.topCharacters = data.data
    }
  }
}

const actions = {
  async getTopManga ({ commit, state }) {
    if (state.topManga !== null) return
    const res = await fetch(`${baseUrl}/top/manga`)
    const data = await res.json()
    data.name = 'topManga'
    commit('setHomePageContent', data)
  },
  async getTopCharacters ({ commit, state }) {
    if (state.topCharacters !== null) return
    const res = await fetch(`${baseUrl}/top/characters`)
    const data = await res.json()
    data.name = 'topCharacters'
    commit('setHomePageContent', data)
  },
  async getAnimeUpcoming ({ commit, state }) {
    if (state.animeUpcoming !== null) return
    const res = await fetch(`${baseUrl}/seasons/upcoming`)
    const data = await res.json()
    data.name = 'animeUpcoming'
    commit('setHomePageContent', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
