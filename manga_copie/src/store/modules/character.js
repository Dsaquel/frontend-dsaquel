const baseUrl = 'https://api.jikan.moe/v4'

const state = {
  characters: [],
  lastPageVisible: null,
  character: null
}
const getters = {}

const mutations = {
  setCharacter (state, character) {
    state.character = character
  }
}

const actions = {
  async getCharacter ({ commit }, id) {
    const res = await fetch(`${baseUrl}/characters/${id}`)
    const data = await res.json()
    commit('setCharacter', data.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
