const baseUrl = 'https://api.jikan.moe/v4'

const state = {
  animes: [],
  lastPageVisible: null,
  anime: null
}
const getters = {}

const mutations = {
  setAnime (state, anime) {
    state.anime = anime
  }
}

const actions = {
  async getAnime ({ commit }, id) {
    const res = await fetch(`${baseUrl}/anime/${id}`)
    const data = await res.json()
    commit('setAnime', data.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
