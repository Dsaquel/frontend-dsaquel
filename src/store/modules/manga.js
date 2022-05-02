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
  pickMangas: null,
  lastPageVisible: null,
  mostMangaFavorites: null,
  mangaRecommendations: null,
  currentRecommendationTitle: null
}

const getters = {
  mostMangaFavorites (state) {
    const array = state.mostMangaFavorites
    if (array !== null) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }
  }
}

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
  },
  setMostFavoritesManga (state, data) {
    state.mostMangaFavorites = data
  },
  setPickMangas (state, data) {
    state.pickMangas = data
  }
}

const actions = {
  async getManga ({
    commit
  }, id) {
    const res = await fetch(`${process.env.VUE_APP_API_URL}/api/stuff/getManga/${id}`, {
      method: 'get'
    })
    const data = await res.json()
    commit('setManga', data)
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
    commit,
    state
  }, idManga) {
    if (state.mangaRecommendations !== null) return
    const res = await fetch(`${baseUrl}/manga/${idManga}/recommendations`)
    const data = await res.json()
    data.name = 'recommendation'
    commit('setDifferentsManga', data)
  },
  async getMostFavoritesManga ({
    commit,
    state
  }) {
    if (state.mostMangaFavorites !== null) return
    const res = fetch(`${process.env.VUE_APP_API_URL}/api/public/mostFavoritesManga`, {
      method: 'get'
    })
    const data = await (await res).json()
    commit('setMostFavoritesManga', data)
  },
  async pickMangas ({ commit, state }) {
    if (state.pickMangas !== null) return
    const res = fetch(`${process.env.VUE_APP_API_URL}/api/public/pickMangas`, {
      method: 'get'
    })
    const data = await (await res).json()
    commit('setPickMangas', data)
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
  async insertManga ({
    commit
  }, stuff) {
    const data = JSON.stringify({
      stuff,
      id: stuff.id,
      token: this.state.token,
      type: 'manga'
    })
    fetch(`${process.env.VUE_APP_API_URL}/api/stuff/insertStuff`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.setItem('userStuff', data)
          window.dispatchEvent(new CustomEvent('userStuff', {
            detail: {
              storage: localStorage.getItem('userStuff')
            }
          }))
        }
      })
      .catch((error) => {
        console.log(error)
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
