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
  filters: {
    type: [],
    genres: [],
    status: [],
    orderBy: []
  },
  animeFiltered: null,
  animeSeasonNow: null,
  topReviewsAnime: null,
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
    if (animes.name === 'filter') {
      state.animeFiltered = animes.data
      state.lastPageVisible = animes.pagination.last_visible_page
    }
    if (animes.name === 'seasonNow') {
      state.animeSeasonNow = animes.data
    }
    if (animes.name === 'topReviewsAnime') {
      state.topReviewsAnime = animes.data
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
  async getAnimeFiltered ({
    commit
  }, query) {
    const url = new URL(`${baseUrl}/anime?${query}&sfw`)
    localStorage.setItem('url', url)
    const res = await fetch(`${baseUrl}/anime?${query}&sfw`)
    const data = await res.json()
    data.name = 'filter'
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
  async getTopReviewsAnime ({
    commit
  }) {
    const res = await fetch(`${baseUrl}/top/reviews`)
    const data = await res.json()
    data.name = 'topReviewsAnime'
    commit('setDifferentsAnime', data)
  },
  async getPagination ({
    commit
  }, page) {
    const url = localStorage.getItem('url')
    const res = await fetch(`${url}?&page=${page}`)
    const data = await res.json()
    data.name = 'filter'
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
