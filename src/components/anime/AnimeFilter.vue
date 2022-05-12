<template>
  <v-container>
    <CardFilterAnime />
    <v-row>
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

    <Pagination
      :lastPageVisible="lastPageVisible"
      @getPagination="getPagination"
    />
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
    selected: ''
  }),
  beforeCreate () {
    const query = this.$route.query.filter
    this.$store.dispatch('Anime/GET_ANIME_FILTERED', query)
  },
  methods: {
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
