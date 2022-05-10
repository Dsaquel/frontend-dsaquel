import DataService from '@/services/extends/dataService'
import { SET_CHARACTER } from '@/store/types/mutation-types'
import { GET_CHARACTER } from '@/store/types/action-types'

const Data = new DataService()

const state = {
  character: null,
  characters: [],
  lastPageVisible: null
}
const getters = {}

const mutations = {
  [SET_CHARACTER] (state, character) {
    state.character = character
  }
}

const actions = {
  async [GET_CHARACTER] ({ commit }, id) {
    const res = await Data.getCharacter(id)
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
