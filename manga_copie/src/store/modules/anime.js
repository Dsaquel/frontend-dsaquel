const baseUrl = 'https://api.jikan.moe/v4'

const state = {
  animes: null,
  animeSchedules: null,
  animeSeasonNow: null,
  animeGenres: null,
  lastPageVisible: null,
  anime: null,
  tags: [
    { name: 'action', id: 1 },
    { name: 'aventure', id: 2 },
    { name: 'comedy', id: 4 },
    { name: 'drama', id: 8 },
    { name: 'fantasy', id: 10 },
    { name: 'girls love', id: 26 },
    { name: 'gourmet', id: 47 },
    { name: 'horreur', id: 14 },
    { name: 'mystery', id: 7 },
    { name: 'romance', id: 22 },
    { name: 'sci-fi', id: 24 },
    { name: 'slice-of-life', id: 36 },
    { name: 'sports', id: 30 },
    { name: 'supernatural', id: 37 },
    { name: 'suspense', id: 41 }
  ],
  selectedGenre: ''
}
const getters = {}

const mutations = {
  setAnimes (state, animes) {
    state.animes.push({
      data: animes.data,
      name: animes.name
    })
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
      state.lastPageVisible = animes.pagination.last_visible_page
    }
  },
  setAnime (state, anime) {
    state.anime = anime.data
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
  async getAnimeSchedules ({
    commit,
    state
  }, filter) {
    if (state.animeSchedules !== null && filter === undefined) return
    const res = await fetch(`${baseUrl}/schedules`)
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
