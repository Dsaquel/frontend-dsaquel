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
        <DefaultAnime :item="item" />
      </v-col>
      <v-col cols="12"> </v-col>
    </v-row>

    <Pagination
      :lastPageVisible="lastPageVisible"
      @getPagination="getPagination"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import DefaultAnime from '../utilities/DefaultAnime'
import Pagination from '../utilities/Pagination'
import CardFilterAnime from '../utilities/CardFilterAnime'
export default {
  name: 'AnimeGenre',
  components: {
    DefaultAnime,
    Pagination,
    CardFilterAnime
  },
  data: () => ({
    selected: ''
  }),
  mounted () {
    const query = this.$route.query.filter
    this.$store.dispatch('Anime/getAnimeFiltered', query)
  },
  methods: {
    getPagination (page) {
      this.$store.dispatch('Anime/getPagination', page)
    },
    affectTag (tag) {
      this.selected = tag
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.Anime.tags,
      filters: (state) => state.Anime.filters,
      selectedGenre: (state) => state.Anime.selectedGenre,
      animeFiltered: (state) => state.Anime.animeFiltered,
      lastPageVisible: (state) => state.Anime.lastPageVisible
    })
  }
}
</script>
