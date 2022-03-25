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
  manga: null,
  mangas: [],
  mangaGenres: null,
  mangaSchedules: null,
  mangaSeasonNow: null,
  // mangasListContent: null,
  lastPageVisible: null

}

const getters = {}

const mutations = {
  setManga (state, manga) {
    state.manga = manga
  },
  setDifferentsManga (state, mangas) {
    if (mangas.name === 'genres') {
      console.log(mangas.data)
      state.mangaGenres = mangas.data
      state.lastPageVisible = mangas.pagination.last_visible_page
    }
    if (mangas.name === 'schedules') {
      state.mangaSchedules = mangas.data
    }
    if (mangas.name === 'seasonNow') {
      state.mangaSeasonNow = mangas.data
    }
  }
}

const actions = {
  async getManga ({ commit }, id) {
    const res = await fetch(`${baseUrl}/manga/${id}`)
    const data = await res.json()
    commit('setManga', data.data)
  },
  async getMangaGenres ({
    commit
  }, id) {
    const url = new URL(`${baseUrl}/manga?genres=${id}`)
    localStorage.setItem('url', url)
    const res = await fetch(`${baseUrl}/manga?genres=${id}`)
    const data = await res.json()
    data.name = 'genres'
    commit('setDifferentsManga', data)
  },
  async getPagination ({
    commit
  }, page) {
    const url = localStorage.getItem('url')
    const res = await fetch(`${url}?&page=${page}`)
    const data = await res.json()
    // TODO: make it reactive
    data.name = 'genres'
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
