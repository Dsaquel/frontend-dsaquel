import { SET_ANIME, SET_ANIME_FILTERED, SET_TOP_REVIEWS_ANIME, SET_SEASON_NOW } from '@/store/types/mutation-types'
import { GET_ANIME, GET_ANIME_FILTERED, GET_ANIME_SEASON_NOW, GET_REVIEWS_ANIME, INSERT_ANIME } from '@/store/types/action-types'
import DataService from '@/services/dataService'

const Data = new DataService()

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
  [SET_ANIME] (state, anime) {
    state.anime = anime
  },
  [SET_ANIME_FILTERED] (state, animes) {
    state.animeFiltered = animes.data
    state.lastPageVisible = animes.pagination.last_visible_page
  },
  [SET_TOP_REVIEWS_ANIME] (state, data) {
    state.topReviewsAnime = data
  },
  [SET_SEASON_NOW] (state, data) {
    state.animeSeasonNow = data
  }
}

const actions = {
  async [GET_ANIME] ({
    commit
  }, id) {
    const res = await Data.getAnime(id)
    if (res.error) {
      console.log(res)
    } else {
      commit(SET_ANIME, res)
    }
  },
  async [INSERT_ANIME] ({ commit }, stuff) {
    const data = {
      stuff,
      id: stuff.id,
      token: this.state.Account.token,
      type: 'anime'
    }
    const res = await Data.insertAnime(data)
    if (res.error) {
      localStorage.setItem('userStuff', JSON.stringify(data))
      window.dispatchEvent(new CustomEvent('userStuff', {
        detail: {
          storage: localStorage.getItem('userStuff')
        }
      }))
    } else {
      this.commit('setSuccessSnackbar', res)
    }
  },
  async [GET_REVIEWS_ANIME] ({
    commit, state
  }) {
    if (state.topReviewsAnime !== null) return
    const res = fetch(`${process.env.VUE_APP_API_URL}/public/topReviewsAnime`, {
      method: 'get'
    })
    const data = await (await res).json()
    commit(SET_TOP_REVIEWS_ANIME, data)
  },
  async [GET_ANIME_FILTERED] ({
    commit
  }, query) {
    const res = await Data.getAnimefiltered(query)
    commit(SET_ANIME_FILTERED, res)
  },
  async [GET_ANIME_SEASON_NOW] ({
    commit,
    state
  }) {
    if (state.animeSeasonNow !== null) return
    const res = fetch(`${process.env.VUE_APP_API_URL}/public/animeSeasonNow`, {
      method: 'get'
    })
    const data = await (await res).json()
    commit(SET_SEASON_NOW, data)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
