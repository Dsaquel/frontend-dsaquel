const baseUrl = 'https://api.jikan.moe/v4'
const state = {
  tags: [{
    name: 'action',
    id: 1
  },
  {
    name: 'adventure',
    id: 2
  },
  {
    name: 'comedy',
    id: 4
  },
  {
    name: 'drama',
    id: 8
  },
  {
    name: 'fantasy',
    id: 10
  },
  {
    name: 'seinen',
    id: 42
  },
  {
    name: 'gourmet',
    id: 47
  },
  {
    name: 'horror',
    id: 14
  },
  {
    name: 'mystery',
    id: 7
  },
  {
    name: 'romance',
    id: 22
  },
  {
    name: 'sci-fi',
    id: 24
  },
  {
    name: 'shounen',
    id: 27
  },
  {
    name: 'sports',
    id: 30
  },
  {
    name: 'supernatural',
    id: 37
  },
  {
    name: 'suspense',
    id: 41
  },
  {
    name: 'shoujo',
    id: 25
  }
  ],
  manga: null,
  mangas: [],
  filters: {
    type: [],
    genres: [],
    status: [],
    orderBy: []
  },
  mangaFiltered: null,
  mangaPicking: null,
  lastPageVisible: null,
  mostMangaFavorites: null,
  mangaRecommendations: null,
  currentRecommendationTitle: null
}

const getters = {}

const mutations = {
  setManga (state, manga) {
    state.manga = manga
  },
  setDifferentsManga (state, mangas) {
    if (mangas.name === 'filter') {
      state.mangaFiltered = mangas.data
      state.lastPageVisible = mangas.pagination.last_visible_page
    }

    if (mangas.name === 'recommendation') {
      state.mangaRecommendations = mangas.data
    }
    if (mangas.name === 'favorites') {
      state.mostMangaFavorites = mangas.data
    }
  }
}

const actions = {
  async getManga ({
    commit
  }, id) {
    const res = await fetch(`${baseUrl}/manga/${id}`)
    const data = await res.json()
    commit('setManga', data.data)
  },
  async getMangaFiltered ({
    commit
  }, query) {
    const url = new URL(`${baseUrl}/manga?${query}&sfw`)
    localStorage.setItem('url', url)
    const res = await fetch(`${baseUrl}/manga?${query}&sfw`)
    const data = await res.json()
    data.name = 'filter'
    commit('setDifferentsManga', data)
  },
  async getMangaRecommendation ({
    commit, state
  }, idManga) {
    if (state.mangaRecommendations !== null) return
    const res = await fetch(`${baseUrl}/manga/${idManga}/recommendations`)
    const data = await res.json()
    data.name = 'recommendation'
    commit('setDifferentsManga', data)
  },
  async getMostFavoritesManga ({ commit, state }) {
    if (state.mostMangaFavorites !== null) return
    const res = await fetch(`${baseUrl}/manga?order_by=favorites&sort=desc&sfw`)
    const data = await res.json()
    data.name = 'favorites'
    commit('setDifferentsManga', data)
  },
  async getPagination ({
    commit
  }, page) {
    const url = localStorage.getItem('url')
    const res = await fetch(`${url}?&page=${page}`)
    const data = await res.json()
    // TODO: make it reactive
    data.name = 'filter'
    commit('setDifferentsManga', data)
  },
  insertManga ({ commit }, manga) {
    fetch('http://localhost:3000/api/stuff/insertManga', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        manga
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
