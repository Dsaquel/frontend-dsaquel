import ArrayService from '@/services/serviceArray'
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

const Array = new ArrayService()
const Manga = new MangaService()
const Anime = new AnimeService()
const Character = new CharacterService()

const state = {
  topManga: null,
  animeUpcoming: null,
  topCharacters: null
}

const getters = {
  topManga: (state) => Array.suffle(state.topManga),
  animeUpcoming: (state) => Array.suffle(state.animeUpcoming),
  topCharacters: (state) => Array.suffle(state.topCharacters)
}

const mutations = {
  [SET_TOP_MANGA]: (state, data) => {
    state.topManga = data
  },
  [SET_ANIME_UPCOMING]: (state, data) => {
    state.animeUpcoming = data
  },
  [SET_TOP_CHARACTERS]: (state, data) => {
    state.topCharacters = data
  }
}

const actions = {
  [GET_TOP_MANGA]: async ({ commit, state }) => {
    if (state.topManga) return
    const res = await Manga.getTopManga()
    commit(SET_TOP_MANGA, res)
  },
  [GET_ANIME_UPCOMING]: async ({ commit, state }) => {
    if (state.animeUpcoming) return
    const res = await Anime.getAnimeUpComing()
    commit(SET_ANIME_UPCOMING, res)
  },
  [GET_TOP_CHARACTERS]: async ({ commit, state }) => {
    if (state.topCharacters) return
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
