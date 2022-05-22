<template>
  <v-form @submit="sendRequest" class="d-flex flex-wrap align-center">
     <v-text-field
      class="mr-4"
      v-model="searchManga"
      label="kingdom"
    ></v-text-field>
    <v-btn class="mr-6" @click="sendRequest" color="success" type="submit" hidden>search</v-btn>
    <v-menu :close-on-content-click="menu" max-width="max-content">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </template>
      <v-card min-width="250">
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
              <v-list-item-title>type manga</v-list-item-title>
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
              <v-chip-group v-model="status" column active-class="primary--text">
                <v-chip
                  v-for="mangaStatus in mangasStatus"
                  :value="mangaStatus"
                  outlined
                  :key="mangaStatus"
                  >{{ mangaStatus }}</v-chip
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
  name: 'CardFilterManga',
  data: () => ({
    sfw: true,
    menu: false,
    query: null,
    searchManga: '',
    types: [
      'manga',
      'novel',
      'lightnovel',
      'oneshot',
      'doujin',
      'manhwa',
      'manhua'
    ],
    mangasStatus: [
      'upcoming',
      'publishing',
      'complete',
      'discontinued',
      'hiatus'
    ]
  }),
  methods: {
    sendRequest () {
      this.$store.commit('Manga/SET_MANGA_FILTERED', { data: null, pagination: { last_visible_page: null } })
      const filters = this.$route.query.filter
      const isQueryExist = new URLSearchParams(filters).get('order_by')
      const status = (this.statusStore && this.statusStore) ? 'status=' + this.statusStore : null
      const type = (this.typeStore && this.typeStore) ? 'type=' + this.typeStore : null
      const genres = (this.genresStore) ? 'genres=' + this.genresStore : null
      const orderBy = (isQueryExist) ? 'order_by=' + isQueryExist.toString() : 'order_by=members'
      const title = (this.searchManga && this.searchManga.length) ? 'q=' + this.searchManga : null
      const sfw = 'sfw'
      const sort = 'sort=desc'
      const group = [{ title }, { type }, { sfw }, { genres }, { orderBy }, { status }, { sort }]
      group.forEach(element => Object.keys(element).forEach((k) => element[k] === null && delete element[k]))
      const query = group.filter(value => Object.keys(value).length !== 0).map(value => Object.values(value)[0]).join('&')
      this.$router.push({ path: '/manga', query: { filter: query } })
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.Manga.tags,
      typeStore: (state) => state.Manga.filters.type,
      genresStore: (state) => state.Manga.filters.genres,
      statusStore: (state) => state.Manga.filters.status
    }),
    type: {
      get () {
        return this.typeStore
      },
      set (newType) {
        this.$store.state.Manga.filters.type = newType
      }
    },
    genres: {
      get () {
        return this.genresStore
      },
      set (newGenres) {
        this.$store.state.Manga.filters.genres = newGenres
      }
    },
    status: {
      get () {
        return this.statusStore
      },
      set (newStatus) {
        this.$store.state.Manga.filters.status = newStatus
      }
    }
  }
}
</script>
