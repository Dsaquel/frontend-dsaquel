const state = {
  animeUpcoming: null,
  topManga: null,
  topCharacters: null
}

const getters = {
  topManga (state) {
    const array = state.topManga
    if (array !== null) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }
  },
  animeUpcoming (state) {
    const array = state.animeUpcoming
    if (array !== null) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }
  },
  topCharacters (state) {
    const array = state.topCharacters
    if (array !== null) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }
  }
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
    const res = fetch(`${process.env.VUE_APP_API_URL}/api/public/topManga`, {
      method: 'get'
    })
    const data = await (await res).json()
    commit('setTopManga', data)
  },
  async getAnimeUpcoming ({ commit, state }) {
    if (state.animeUpcoming !== null) return
    const res = fetch(`${process.env.VUE_APP_API_URL}/api/public/animeUpcoming`, {
      method: 'get'
    })
    const data = await (await res).json()
    commit('setAnimeUpcoming', data)
  },
  async getTopCharacters ({ commit, state }) {
    if (state.topCharacters !== null) return
    const res = fetch(`${process.env.VUE_APP_API_URL}/api/public/topCharacters`, {
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
