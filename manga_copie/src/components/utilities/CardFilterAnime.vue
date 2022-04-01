<template>
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
            <v-chip-group v-model="type" multiple max="3" active-class="primary--text">
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
            <v-chip-group v-model="orderBy" multiple max="3" active-class="primary--text">
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
                v-for="statu in animeStatus"
                :value="statu"
                outlined
                :key="statu"
                >{{ statu }}</v-chip
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

        <v-btn text @click="menu = false"> Cancel </v-btn>
        <v-btn color="primary" text @click="sendRequest"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
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
    animeStatus: ['upcoming', 'airing', 'complete']
  }),
  props: {},
  methods: {
    sendRequest () {
      const status = 'status=' + this.status
      const type = 'type=' + this.type.join('&')
      const genres = 'genres=' + this.genres.join('&')
      const orderBy = 'order_by=' + this.orderBy.join('&')
      const query = [genres, type, orderBy, status].join('&')
      this.$router.replace({ name: 'AnimeFilter', query: { filter: query } })
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
