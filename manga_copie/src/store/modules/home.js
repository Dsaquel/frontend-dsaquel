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
  async getHomePageContent ({
    commit,
    state
  }) {
    if (state.animeUpcoming !== null) return
    const promises = [{
      promise: 'top/manga',
      name: 'topManga'
    }, {
      promise: 'seasons/upcoming',
      name: 'animeUpcoming'
    }, {
      promise: 'top/characters',
      name: 'topCharacters'
    }]

    await Promise.all(
      promises.map(async (promise) => {
        const res = await fetch(`${baseUrl}/${promise.promise}`)
        const data = await res.json()
        data.name = promise.name
        commit('setHomePageContent', data)
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
