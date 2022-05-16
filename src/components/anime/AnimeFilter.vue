<template>
  <v-container>
    <CardFilterAnime />
    <v-btn @click="show = !show">sort
      <v-icon v-text="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
    </v-btn>
    <v-radio-group  v-show="show" v-model="radioGroup">
      <v-radio
        v-for="order in orders"
        @change="getSort(order)"
        :key="order"
        :label="order"
        :value="order"
      />
    </v-radio-group>
    <v-row v-if="animeFiltered">
      <v-col
        cols="12"
        lg="2"
        md="3"
        sm="3"
        v-for="(item, i) in animeFiltered"
        :key="i"
      >
        <DefaultItem :to="'detailAnime'" :item="item" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        cols="12"
        lg="2"
        md="3"
        sm="3"
        v-for="n in 10"
        :key="n"
      >
        <v-skeleton-loader type="card" loading width="200"></v-skeleton-loader>
      </v-col>
    </v-row>
    <Pagination
      v-if="lastPageVisible"
      :lastPageVisible="lastPageVisible"
      @getPagination="getPagination"
    />
    <v-skeleton-loader v-else width="200" loading type="actions" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import DefaultItem from '../utilities/DefaultItem'
import Pagination from '../utilities/Pagination'
import CardFilterAnime from '../utilities/CardFilterAnime'
export default {
  name: 'AnimeGenre',
  components: {
    DefaultItem,
    Pagination,
    CardFilterAnime
  },
  data: () => ({
    show: false,
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
    selected: '',
    radioGroup: ''
  }),
  beforeCreate () {
    const query = this.$route.query.filter
    this.$store.dispatch('Anime/GET_ANIME_FILTERED', query)
  },
  mounted () {
    const query = this.$route.query.filter
    const params = new URLSearchParams(query)
    this.radioGroup = params.get('order_by').toString()
  },
  methods: {
    getSort (selected) {
      const query = this.$route.query.filter
      const params = new URLSearchParams(query)
      params.set('order_by', selected)
      const newQuery = params.toString()
      this.$router.push({ query: { filter: newQuery } })
    },
    getPagination (page) {
      const query = this.$route.query.filter
      const params = new URLSearchParams(query)
      params.set('page', page)
      const newQuery = params.toString()
      this.$router.push({ query: { filter: newQuery } })
    },
    affectTag (tag) {
      this.selected = tag
    }
  },
  computed: {
    ...mapState({
      animeFiltered: (state) => state.Anime.animeFiltered,
      lastPageVisible: (state) => state.Anime.lastPageVisible
    })
  }
}
</script>
