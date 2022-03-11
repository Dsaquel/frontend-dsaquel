const baseUrl = 'https://api.jikan.moe/v4'
const state = {
  mangas: []
}

const getters = {

}

const mutations = {
  setMangas (state, mangas) {
    state.mangas = mangas
  }
}

const actions = {
  async getMangas ({ commit }) {
    const res = await fetch(`${baseUrl}/top/anime`)
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
