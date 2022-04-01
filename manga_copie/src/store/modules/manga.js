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
  mangaRecommendations: null,
  mangaReviewsManga: null,
  lastPageVisible: null

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
    if (mangas.name === 'recommendations') {
      state.mangaRecommendations = mangas.data
    }
    if (mangas.name === 'ReviewsManga') {
      state.mangaReviewsManga = mangas.data
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
    const url = new URL(`${baseUrl}/anime?${query}&sfw`)
    localStorage.setItem('url', url)
    const res = await fetch(`${baseUrl}/anime?${query}&sfw`)
    const data = await res.json()
    data.name = 'filter'
    commit('setDifferentsManga', data)
  },
  async getMangaRecommendations ({
    commit
  }) {
    const res = await fetch(`${baseUrl}/manga/2`)
    const data = await res.json()
    data.name = 'recommendations'
    commit('setDifferentsManga', data)
  },
  async getMangaReviewsManga ({
    commit
  }) {
    const res = await fetch(`${baseUrl}/reviews/manga`)
    const data = await res.json()
    data.name = 'ReviewsManga'
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
