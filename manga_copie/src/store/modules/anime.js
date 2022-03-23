const baseUrl = 'https://api.jikan.moe/v4'

const state = {
  animes: null,
  animeSchedules: null,
  animeSeasonNow: null,
  animeGenres: null,
  lastPageVisible: null,
  anime: null
}
const getters = {}

const mutations = {
  setAnimes (state, animes) {
    state.animes.push({ data: animes.data, name: animes.name })
    state.lastPageVisible = animes.pagination.last_visible_page
  },
  setDifferentsAnime (state, animes) {
    if (animes.name === 'schedules') {
      state.animeSchedules = animes.data
    }
    if (animes.name === 'seasonNow') {
      state.animeSeasonNow = animes.data
    }
    if (animes.name === 'genres') {
      state.animeGenres = animes.data
    }
  },

  setAnime (state, anime) {
    state.anime = anime.data
  }
}

const actions = {
  async getAnime ({ commit }, id) {
    const res = await fetch(`${baseUrl}/anime/${id}`)
    const data = await res.json()
    commit('setAnime', data)
  },
  async getAnimeSchedules ({
    commit, state
  }, filter) {
    if (state.animeSchedules !== null && filter === undefined) return
    const res = await fetch(`${baseUrl}/schedules`)
    const data = await res.json()
    data.name = 'schedules'
    commit('setDifferentsAnime', data)
  },
  async getAnimeSeasonNow ({ commit, state }, filter) {
    if (state.animeSeasonNow !== null && filter === undefined) return
    const res = await fetch(`${baseUrl}/seasons/now`)
    const data = await res.json()
    data.name = 'seasonNow'
    commit('setDifferentsAnime', data)
  },
  async getAnimeGenres ({ commit }, filter) {
    const res = await fetch(`${baseUrl}/${filter}`)
    const data = await res.json()
    data.name = 'genres'
    commit('setDifferentsAnime', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
