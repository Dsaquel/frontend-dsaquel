import CharacterService from '@/services/extends/characterService'
import { SET_CHARACTER } from '@/store/types/mutation-types'
import { GET_CHARACTER } from '@/store/types/action-types'

const Character = new CharacterService()

const state = {
  character: null,
  characters: [],
  lastPageVisible: null
}
const getters = {}

const mutations = {
  [SET_CHARACTER]: (state, character) => {
    state.character = character
  }
}

const actions = {
  [GET_CHARACTER]: async ({ commit }, id) => {
    const res = await Character.getCharacter(id)
    commit(SET_CHARACTER, res)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
