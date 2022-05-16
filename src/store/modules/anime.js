import AnimeService from '@/services/extends/animeService'
import AccountService from '@/services/extends/accountService'
import {
  SET_ANIME,
  SET_LOADER,
  SET_SEASON_NOW,
  SET_ANIME_FILTERED,
  SET_TOP_REVIEWS_ANIME
} from '@/store/types/mutation-types'
import {
  GET_ANIME,
  INSERT_ANIME,
  GET_REVIEWS_ANIME,
  GET_ANIME_FILTERED,
  GET_ANIME_SEASON_NOW
} from '@/store/types/action-types'

const Anime = new AnimeService()
const Account = new AccountService()

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
  loader: {
    insertAnimeLoad: false
  },
  anime: null,
  filters: {
    type: null,
    genres: null,
    status: null,
    orderBy: null
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
  [SET_LOADER] (state, data) {
    state.loader[Object.keys(data).toString()] = data[Object.keys(data)[0]]
  },
  [SET_SEASON_NOW] (state, data) {
    state.animeSeasonNow = data
  },
  [SET_ANIME_FILTERED] (state, animes) {
    state.animeFiltered = animes.data
    state.lastPageVisible = animes.pagination.last_visible_page
  },
  [SET_TOP_REVIEWS_ANIME] (state, data) {
    state.topReviewsAnime = data
  }
}

const actions = {
  async [GET_ANIME] ({
    commit
  }, id) {
    const res = await Anime.getAnime(id)
    if (res.error) {
      console.log(res)
    } else {
      commit(SET_ANIME, res)
    }
  },
  async [INSERT_ANIME] ({ commit }, stuff) {
    commit(SET_LOADER, { insertAnimeLoad: true })
    const data = {
      stuff,
      id: stuff.id,
      token: this.state.Account.token,
      type: 'anime'
    }
    const res = await Account.insertStuff(data)
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
    commit(SET_LOADER, { insertAnimeLoad: false })
  },
  async [GET_REVIEWS_ANIME] ({
    commit, state
  }) {
    if (state.topReviewsAnime !== null) return
    const res = await Anime.getReviewsAnime()
    commit(SET_TOP_REVIEWS_ANIME, res)
  },
  async [GET_ANIME_FILTERED] ({
    commit
  }, query) {
    const res = await Anime.getAnimeFiltered(query)
    commit(SET_ANIME_FILTERED, res)
  },
  async [GET_ANIME_SEASON_NOW] ({
    commit,
    state
  }) {
    if (state.animeSeasonNow !== null) return
    const res = await Anime.getAnimeSeasonNow()
    commit(SET_SEASON_NOW, res)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
