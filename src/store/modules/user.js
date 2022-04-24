const state = {
  stuff: []
}

const getters = {
  // sort by type here
}

const mutations = {
  // push data in stuff
}

const actions = {
  getUserStuff ({ commit }) {
    fetch(`http://localhost:3000/api/stuff/getUserStuff/${this.state.userId}`, {
      method: 'get'
    })
      .then(res => res.json())
      .then(data => console.log(data))
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
