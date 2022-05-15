import MangaService from '@/services/extends/mangaService'
import AccountService from '@/services/extends/accountService'

import {
  SET_MANGA,
  SET_LOADER,
  SET_PICK_MANGA,
  SET_MANGA_FILTERED,
  SET_MOST_FAVORITES_MANGA,
  SET_MANGA_RECOMMENDATIONS
} from '@/store/types/mutation-types'
import {
  GET_MANGA,
  INSERT_MANGA,
  GET_PICK_MANGA,
  GET_MANGA_FILTERED,
  GET_MOST_FAVORITES_MANGA,
  GET_MANGA_RECOMMENDATIONS
} from '@/store/types/action-types'

const Manga = new MangaService()
const Account = new AccountService()

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
  loader: {
    insertMangaLoad: false
  },
  manga: null,
  filters: {
    type: [],
    genres: [],
    status: [],
    orderBy: []
  },
  pickMangas: null,
  mangaPicking: null,
  mangaFiltered: null,
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
  },
  pickMangas (state) {
    const pickMangas = state.pickMangas
    if (pickMangas !== null) {
      pickMangas.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      return pickMangas
    }
  }
}

const mutations = {
  [SET_MANGA] (state, manga) {
    state.manga = manga
  },
  [SET_LOADER] (state, data) {
    state.loader[Object.keys(data).toString()] = data[Object.keys(data)[0]]
  },
  [SET_PICK_MANGA] (state, data) {
    state.pickMangas = data
  },
  [SET_MANGA_FILTERED] (state, mangas) {
    state.mangaFiltered = mangas.data
    state.lastPageVisible = mangas.pagination.last_visible_page
  },
  [SET_MOST_FAVORITES_MANGA] (state, data) {
    state.mostMangaFavorites = data
  },
  [SET_MANGA_RECOMMENDATIONS] (state, mangas) {
    state.mangaRecommendations = mangas.data
  }
}

const actions = {
  async [GET_MANGA] ({
    commit
  }, id) {
    const res = await Manga.getManga(id)
    commit(SET_MANGA, res)
  },
  async [INSERT_MANGA] ({
    commit
  }, stuff) {
    commit(SET_LOADER, { insertMangaLoad: true })
    const data = {
      stuff,
      id: stuff.id,
      token: this.state.Account.token,
      type: 'manga'
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
    commit(SET_LOADER, { insertMangaLoad: false })
  },
  async [GET_PICK_MANGA] ({ commit, state }) {
    if (state.pickMangas !== null) return
    const res = await Manga.getPickManga()
    commit(SET_PICK_MANGA, res)
  },
  async [GET_MANGA_FILTERED] ({
    commit
  }, query) {
    const res = await Manga.getMangaFiltered(query)
    commit(SET_MANGA_FILTERED, res)
  },
  async [GET_MOST_FAVORITES_MANGA] ({
    commit,
    state
  }) {
    if (state.mostMangaFavorites !== null) return
    const res = await Manga.getMostFavoritesManga()
    commit(SET_MOST_FAVORITES_MANGA, res)
  },
  async [GET_MANGA_RECOMMENDATIONS] ({
    commit,
    state
  }, id) {
    if (state.mangaRecommendations !== null) return
    const res = await Manga.getMangaRecommendation(id)
    commit(SET_MANGA_RECOMMENDATIONS, res)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
