const state = {
  stuff: [],
  email: null,
  pseudo: null
}

const getters = {
  animes (state) {
    const animes = state.stuff.filter(element => element.type === 'anime')
    const result = []
    animes.forEach(element => {
      const json = JSON.parse(element.data)
      json._id = element._id
      result.push(json)
    })
    return result
  },
  mangas () {
    const mangas = state.stuff.filter(element => element.type === 'manga')
    const result = []
    mangas.forEach(element => {
      const json = JSON.parse(element.data)
      json._id = element._id
      result.push(json)
    })
    return result
  }
}

const mutations = {
  setUserStuff (state, data) {
    state.stuff = data
  },
  setUserInformation (state, data) {
    state.email = data.email
    state.pseudo = data.pseudo
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
  },
  getUserProfile ({ commit }) {
    fetch(`http://localhost:3000/api/auth/userProfile/${this.state.token}`, {
      method: 'get'
    })
      .then(res => res.json())
      .then(data => commit('setUserInformation', data))
  },
  deleteUserStuff ({ commit }, _id) {
    fetch(`http://localhost:3000/api/stuff/deleteUserStuff/${this.state.token}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id
      })
    }).then(res => res.json())
      .then(data => commit('setUserStuff', data))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
