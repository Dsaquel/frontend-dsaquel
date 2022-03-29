const baseUrl = 'https://api.jikan.moe/v4'

const state = {
  tags: [
    { name: 'action', id: 1 },
    { name: 'adventure', id: 2 },
    { name: 'comedy', id: 4 },
    { name: 'drama', id: 8 },
    { name: 'fantasy', id: 10 },
    { name: 'seinen', id: 42 },
    { name: 'gourmet', id: 47 },
    { name: 'horror', id: 14 },
    { name: 'mystery', id: 7 },
    { name: 'romance', id: 22 },
    { name: 'sci-fi', id: 24 },
    { name: 'shounen', id: 27 },
    { name: 'sports', id: 30 },
    { name: 'supernatural', id: 37 },
    { name: 'suspense', id: 41 },
    { name: 'shoujo', id: 25 }
  ],
  anime: null,
  animes: null,
  animeGenres: null,
  animeSchedules: null,
  animeSeasonNow: null,
  lastPageVisible: null
}
const getters = {}

const mutations = {
  setAnime (state, anime) {
    state.anime = anime.data
  },
  setAnimes (state, animes) {
    state.animes.push({
      data: animes.data,
      name: animes.name
    })
    state.lastPageVisible = animes.pagination.last_visible_page
  },
  setDifferentsAnime (state, animes) {
    if (animes.name === 'genres') {
      state.animeGenres = animes.data
      state.lastPageVisible = animes.pagination.last_visible_page
    }
    if (animes.name === 'schedules') {
      state.animeSchedules = animes.data
    }
    if (animes.name === 'seasonNow') {
      state.animeSeasonNow = animes.data
    }
  }
}

const actions = {
  async getAnime ({
    commit
  }, id) {
    const res = await fetch(`${baseUrl}/anime/${id}`)
    const data = await res.json()
    commit('setAnime', data)
  },
  async getAnimeGenres ({
    commit
  }, id) {
    const url = new URL(`${baseUrl}/anime?genres=${id}`)
    localStorage.setItem('url', url)
    const res = await fetch(`${baseUrl}/anime?genres=${id}`)
    const data = await res.json()
    data.name = 'genres'
    commit('setDifferentsAnime', data)
  },
  async getAnimeSchedules ({
    commit,
    state
  }, filter) {
    if (state.animeSchedules !== null && filter === undefined) return
    const day = new Date().toLocaleString('en-GB', { weekday: 'long' })
    const res = await fetch(`${baseUrl}/schedules/${day}`)
    const data = await res.json()
    data.name = 'schedules'
    commit('setDifferentsAnime', data)
  },
  async getAnimeSeasonNow ({
    commit,
    state
  }, filter) {
    if (state.animeSeasonNow !== null && filter === undefined) return
    const res = await fetch(`${baseUrl}/seasons/now`)
    const data = await res.json()
    data.name = 'seasonNow'
    commit('setDifferentsAnime', data)
  },
  async getPagination ({
    commit
  }, page) {
    const url = localStorage.getItem('url')
    const res = await fetch(`${url}?&page=${page}`)
    const data = await res.json()
    // TODO: make it reactive
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
