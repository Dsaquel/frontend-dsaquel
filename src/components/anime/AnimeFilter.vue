<template>
  <v-container>
    <CardFilterAnime />
    <v-row>
      <v-col
        cols="10"
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
  mounted () {
    const query = this.$route.query.filter
    this.$store.dispatch('Anime/GET_ANIME_FILTERED', query)
  },
  methods: {
    getPagination (page) {
      this.$store.dispatch('Anime/GET_PAGINATION', page)
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
