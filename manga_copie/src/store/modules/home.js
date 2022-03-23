const baseUrl = 'https://api.jikan.moe/v4'

const state = {
  homeContent: []
}

const getters = {

}

const mutations = {
  setHomePageContent (state, data) {
    console.log(data)
    state.homeContent.push({
      name: data.name,
      data: data.data
    })
  }
}

const actions = {
  async getHomePageContent ({
    commit, state
  }) {
    if (state.homeContent.length > 0) return
    const promises = [{
      promise: 'top/manga',
      name: 'Top manga',
      tag: 'manga'
    }, {
      promise: 'top/anime',
      name: 'Top anime',
      tag: 'anime'
    }, {
      promise: 'top/characters',
      name: 'Meilleurs personnages',
      tag: 'characters'
    }]

    await Promise.all(
      promises.map(async (promise) => {
        const res = await fetch(`${baseUrl}/${promise.promise}`)
        const data = await res.json()
        const expansion = {
          name: promise.name,
          data: data.data
        }
        console.log(expansion)
        commit('setHomePageContent', expansion)
      })
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
