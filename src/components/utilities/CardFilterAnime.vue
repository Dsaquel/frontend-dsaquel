<template>
  <div class="d-flex flex-nowrap align-center">
    <v-text-field
      class="mr-4"
      v-model="searchAnime"
      label="One piece"
    ></v-text-field>
    <v-btn class="mr-6" @click="sendRequest" color="success">search</v-btn>
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
                column
                v-model="genres"
                multiple
                max="5"
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
                multiple
                max="3"
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
              <v-list-item-title>order By</v-list-item-title>
              <v-chip-group
                v-model="orderBy"
                column
                multiple
                max="3"
                active-class="primary--text"
              >
                <v-chip
                  v-for="order in orders"
                  :value="order"
                  outlined
                  :key="order"
                  >{{ order }}</v-chip
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

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-switch disabled v-model="sfw" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>filter out adult anime</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="score" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>score</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="sendRequest"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardFilterAnime',
  data: () => ({
    sfw: true,
    menu: false,
    score: true,
    query: null,
    types: ['tv', 'movie', 'ova', 'special', 'ona', 'music'],
    orders: [
      'title',
      'type',
      'rating',
      'start_date',
      'end_date',
      'episodes',
      'score',
      'scored_by',
      'rank',
      'popularity',
      'members',
      'favorites'
    ],
    searchAnime: '',
    animesStatus: ['upcoming', 'airing', 'complete']
  }),
  props: {},
  methods: {
    sendRequest () {
      const status = (this.statusStore && this.statusStore.length) ? 'status=' + this.statusStore : null
      const type = (this.typeStore && this.typeStore.length) ? 'type=' + this.typeStore : null
      const genres = (this.genresStore && this.genresStore.length) ? 'genres=' + this.genresStore : null
      const orderBy = (this.orderByStore && this.orderByStore.length) ? 'orderBy=' + this.orderByStore : null
      const title = (this.searchAnime && this.searchAnime.length) ? 'q=' + this.searchAnime : null
      const sfw = 'sfw'
      const sort = 'sort=desc'
      const group = [{ title }, { type }, { sfw }, { genres }, { orderBy }, { status }, { sort }]
      group.forEach(element => Object.keys(element).forEach((k) => element[k] === null && delete element[k]))
      const query = group.filter(value => Object.keys(value).length !== 0).map(value => Object.values(value)[0]).join('&')
      this.$router.push({ path: '/anime/filters', query: { filter: query } })
    }
  },
  watch: {},
  computed: {
    ...mapState({
      tags: (state) => state.Anime.tags,
      typeStore: (state) => state.Anime.filters.type,
      genresStore: (state) => state.Anime.filters.genres,
      statusStore: (state) => state.Anime.filters.status,
      orderByStore: (state) => state.Anime.filters.orderBy
    }),
    type: {
      get () {
        return this.typeStore
      },
      set (newType) {
        this.$store.state.Anime.filters.type = newType
      }
    },
    genres: {
      get () {
        return this.genresStore
      },
      set (newGenres) {
        this.$store.state.Anime.filters.genres = newGenres
      }
    },
    status: {
      get () {
        return this.statusStore
      },
      set (newStatus) {
        this.$store.state.Anime.filters.status = newStatus
      }
    },
    orderBy: {
      get () {
        return this.orderByStore
      },
      set (newOrderBy) {
        this.$store.state.Anime.filters.orderBy = newOrderBy
      }
    }
  }
}
</script>
