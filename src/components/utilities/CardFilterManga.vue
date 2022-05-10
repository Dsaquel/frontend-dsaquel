<template>
  <div class="d-flex flex-nowrap align-center">
     <v-text-field
      class="mr-4"
      v-model="searchManga"
      label="kingdom"
    ></v-text-field>
    <v-btn class="mr-6" @click="sendRequest" color="success">search</v-btn>
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
              <v-chip-group v-model="status" active-class="primary--text">
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

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-switch disabled v-model="sfw" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>filter out adult manga</v-list-item-title>
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
  name: 'CardFilterManga',
  data: () => ({
    sfw: true,
    menu: false,
    score: true,
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
    orders: [
      'title',
      'start_date',
      'end_date',
      'volumes',
      'scored_by',
      'rank',
      'popularity',
      'members',
      'favorites',
      'chapters'
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
      const status = (this.statusStore && this.statusStore.length) ? 'status=' + this.statusStore : null
      const type = (this.typeStore && this.typeStore.length) ? 'type=' + this.typeStore : null
      const genres = (this.genresStore && this.genresStore.length) ? 'genres=' + this.genresStore : null
      const orderBy = (this.orderByStore && this.orderByStore.length) ? 'order_by=' + this.orderByStore : null
      const title = (this.searchManga && this.searchManga.length) ? 'q=' + this.searchManga : null
      const sfw = 'sfw'
      const sort = 'sort=desc'
      const group = [{ title }, { type }, { sfw }, { genres }, { orderBy }, { status }, { sort }]
      group.forEach(element => Object.keys(element).forEach((k) => element[k] === null && delete element[k]))
      const query = group.filter(value => Object.keys(value).length !== 0).map(value => Object.values(value)[0]).join('&')
      this.$router.push({ path: '/manga/filters', query: { filter: query } })
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.Manga.tags,
      typeStore: (state) => state.Manga.filters.type,
      genresStore: (state) => state.Manga.filters.genres,
      statusStore: (state) => state.Manga.filters.status,
      orderByStore: (state) => state.Manga.filters.orderBy
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
    },
    orderBy: {
      get () {
        return this.orderByStore
      },
      set (newOrderBy) {
        this.$store.state.Manga.filters.orderBy = newOrderBy
      }
    }
  }
}
</script>
