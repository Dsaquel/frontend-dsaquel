<template>
  <v-form @submit="sendRequest" class="d-flex flex-wrap align-center">
    <v-text-field
      class="mr-4"
      v-model="searchAnime"
      label="One piece"
    ></v-text-field>
    <v-btn class="mr-6" @click="sendRequest" color="success" type="submit" hidden>search</v-btn>
    <v-menu :close-on-content-click="menu" max-width="max-content">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Genres</v-list-item-title>
              <v-chip-group
                v-model="genres"
                column
                active-class="primary--text"
              >
                <v-chip
                  v-for="(tag, index) in tags"
                  :value="tag.id"
                  outlined
                  :key="index"
                >
                  {{ tag.name }}
                </v-chip>
              </v-chip-group>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-list-item-title>type anime</v-list-item-title>
              <v-chip-group
                v-model="type"
                column
                active-class="primary--text"
              >
                <v-chip
                  v-for="type in types"
                  :value="type"
                  outlined
                  :key="type"
                  >{{ type }}</v-chip
                >
              </v-chip-group>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-list-item-title>status</v-list-item-title>
              <v-chip-group
                v-model="status"
                active-class="primary--text"
                column
              >
                <v-chip
                  v-for="animeStatus in animesStatus"
                  :value="animeStatus"
                  outlined
                  :key="animeStatus"
                  >{{ animeStatus }}</v-chip
                >
              </v-chip-group>
            </v-list-item-action>
          </v-list-item>

        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="sendRequest"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardFilterAnime',
  data: () => ({
    sfw: true,
    menu: false,
    query: null,
    searchAnime: '',
    animesStatus: ['upcoming', 'airing', 'complete'],
    types: ['tv', 'movie', 'ova', 'special', 'ona', 'music']
  }),
  methods: {
    sendRequest: function () {
      this.$store.commit('Anime/SET_ANIME_FILTERED', { data: null, pagination: { last_visible_page: null } })
      const filters = this.$route.query.filter
      const isQueryExist = new URLSearchParams(filters).get('order_by')
      const status = (this.statusStore && this.statusStore) ? 'status=' + this.statusStore : null
      const type = (this.typeStore && this.typeStore) ? 'type=' + this.typeStore : null
      const genres = (this.genresStore && this.genresStore) ? 'genres=' + this.genresStore : null
      const orderBy = (isQueryExist) ? 'order_by=' + isQueryExist.toString() : 'order_by=members'
      const title = (this.searchAnime && this.searchAnime.length) ? 'q=' + this.searchAnime : null
      const sfw = 'sfw'
      const sort = 'sort=desc'
      const group = [{ title }, { type }, { sfw }, { genres }, { orderBy }, { status }, { sort }]
      group.forEach(element => Object.keys(element).forEach((k) => element[k] === null && delete element[k]))
      const query = group.filter(value => Object.keys(value).length !== 0).map(value => Object.values(value)[0]).join('&')
      this.$router.push({ path: '/anime', query: { filter: query } })
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.Anime.tags,
      typeStore: (state) => state.Anime.filters.type,
      genresStore: (state) => state.Anime.filters.genres,
      statusStore: (state) => state.Anime.filters.status
    }),
    type: {
      get: function () {
        return this.typeStore
      },
      set: function (newType) { this.$store.state.Anime.filters.type = newType }

    },
    genres: {
      get () {
        return this.genresStore
      },
      set: function (newGenres) { this.$store.state.Anime.filters.genres = newGenres }
    },
    status: {
      get: function () {
        return this.statusStore
      },
      set: function (newStatus) { this.$store.state.Anime.filters.status = newStatus }
    }
  }
}
</script>
