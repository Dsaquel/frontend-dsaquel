const state = {
  animeUpcoming: null,
  topManga: null,
  topCharacters: null
}

const getters = {

}

const mutations = {
  setTopManga (state, data) {
    state.topManga = data
  },
  setAnimeUpcoming (state, data) {
    state.animeUpcoming = data
  },
  setTopCharacters (state, data) {
    state.topCharacters = data
  }
}

const actions = {
  async getTopManga ({ commit, state }) {
    if (state.topManga !== null) return
    const res = fetch('http://localhost:3000/api/stuff/topManga', {
      method: 'get'
    })
    const data = await (await res).json()
    commit('setTopManga', data)
  },
  async getAnimeUpcoming ({ commit, state }) {
    if (state.animeUpcoming !== null) return
    const res = fetch('http://localhost:3000/api/stuff/animeUpcoming', {
      method: 'get'
    })
    const data = await (await res).json()
    commit('setAnimeUpcoming', data)
  },
  async getTopCharacters ({ commit, state }) {
    if (state.topCharacters !== null) return
    const res = fetch('http://localhost:3000/api/stuff/topCharacters', {
      method: 'get'
    })
    const data = await (await res).json()
    commit('setTopCharacters', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
