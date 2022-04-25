const state = {
  stuff: []
}

const getters = {
  animes (state) {
    const animes = state.stuff.filter(element => element.type === 'anime')
    return animes.map(({ data }) => JSON.parse(data))
  },
  mangas () {
    const mangas = state.stuff.filter(element => element.type === 'manga')
    return mangas.map(({ data }) => JSON.parse(data))
  }
}

const mutations = {
  setUserStuff (state, data) {
    state.stuff = data
  }
}

const actions = {
  getUserStuff ({ commit }) {
    fetch(`http://localhost:3000/api/stuff/getUserStuff/${this.state.token}`, {
      method: 'get'
    })
      .then(res => res.json())
      .then(data => commit('setUserStuff', data))
      .catch(error => console.log(error))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
