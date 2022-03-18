const baseUrl = 'https://api.jikan.moe/v4'

const state = {
  itemNavigationDrawer: []
}

const getters = {}

const mutations = {
  setFilters (state, itemList) {
    state.itemNavigationDrawer.push(itemList)
    state.itemNavigationDrawer.filter(item => item.name !== itemList.name)
  }
}

const actions = {
  async setGenreMangas ({
    commit
  }) {
    const genders = ['genres', 'themes', 'demographics']

    await Promise.all(
      genders.map(async (gender) => {
        const res = await fetch(`${baseUrl}/genres/anime?filter=${gender}`)
        const data = await res.json()
        const items = data.data.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i)
        const expansion = {
          title: gender,
          items
        }
        commit('setFilters', expansion)
      })
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
