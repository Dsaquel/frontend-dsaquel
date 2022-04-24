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
    state.anime = anime
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
  },
  setTopReviewsAnime (state, data) {
    state.topReviewsAnime = data
  },
  setSeasonNow (state, data) {
    state.animeSeasonNow = data
  }
}

const actions = {
  async getAnime ({
    commit
  }, id) {
    const res = await fetch(`http://localhost:3000/api/stuff/getAnime/${id}`, {
      method: 'get'
    })
    const data = await res.json()
    commit('setAnime', data)
  },
  async getAnimeFiltered ({
    commit
  }, query) {
    const url = new URL(`${baseUrl}/anime?sfw&${query}&sfw`)
    localStorage.setItem('url', url)
    console.log(`${baseUrl}/anime?sfw&${query}`)
    const res = await fetch(`${baseUrl}/anime?sfw&${query}&sfw`)
    const data = await res.json()
    data.name = 'filter'
    commit('setDifferentsAnime', data)
  },
  async getAnimeSeasonNow ({
    commit,
    state
  }) {
    if (state.animeSeasonNow !== null) return
    const res = fetch('http://localhost:3000/api/stuff/animeSeasonNow', {
      method: 'get'
    })
    const data = await (await res).json()
    commit('setSeasonNow', data)
  },
  async getTopReviewsAnime ({
    commit, state
  }) {
    if (state.topReviewsAnime !== null) return
    const res = fetch('http://localhost:3000/api/stuff/topReviewsAnime', {
      method: 'get'
    })
    const data = await (await res).json()
    console.log(data)
    commit('setTopReviewsAnime', data)
  },
  async insertAnime ({ commit }, stuff) {
    const resAPI = fetch('http://localhost:3000/api/stuff/insertStuff', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stuff,
        id: stuff.id,
        token: this.state.token,
        type: 'anime'
      })
    })
    console.log(await (await resAPI).json())
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
