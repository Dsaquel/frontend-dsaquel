import AnimeService from '@/services/extends/animeService'
import MangaService from '@/services/extends/mangaService'
import CharacterService from '@/services/extends/characterService'
import {
  SET_TOP_MANGA,
  SET_ANIME_UPCOMING,
  SET_TOP_CHARACTERS
} from '@/store/types/mutation-types'
import {
  GET_TOP_MANGA,
  GET_ANIME_UPCOMING,
  GET_TOP_CHARACTERS
} from '@/store/types/action-types'

const Manga = new MangaService()
const Anime = new AnimeService()
const Character = new CharacterService()

const state = {
  topManga: null,
  animeUpcoming: null,
  topCharacters: null
}

const getters = {
  topManga (state) {
    const array = state.topManga
    if (array !== null) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }
    return null
  },
  animeUpcoming (state) {
    const array = state.animeUpcoming
    if (array !== null) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }
  },
  topCharacters (state) {
    const array = state.topCharacters
    if (array !== null) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }
    return null
  }
}

const mutations = {
  [SET_TOP_MANGA] (state, data) {
    state.topManga = data
  },
  [SET_ANIME_UPCOMING] (state, data) {
    state.animeUpcoming = data
  },
  [SET_TOP_CHARACTERS] (state, data) {
    state.topCharacters = data
  }
}

const actions = {
  async [GET_TOP_MANGA] ({ commit, state }) {
    if (state.topManga !== null) return
    const res = await Manga.getTopManga()
    commit(SET_TOP_MANGA, res)
  },
  async [GET_ANIME_UPCOMING] ({ commit, state }) {
    if (state.animeUpcoming !== null) return
    const res = await Anime.getAnimeUpComing()
    commit(SET_ANIME_UPCOMING, res)
  },
  async [GET_TOP_CHARACTERS] ({ commit, state }) {
    if (state.topCharacters !== null) return
    const res = await Character.getTopCharacters()
    commit(SET_TOP_CHARACTERS, res)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
