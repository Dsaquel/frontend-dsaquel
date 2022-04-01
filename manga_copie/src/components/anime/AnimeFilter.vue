<template>
  <v-container>
    <v-row>
      <CardFilterAnime />
      <v-col cols="10">
        <v-row>
          <v-col cols="4" v-for="(item, index) in animes" :key="index">
            <CardComponent :item="item">
              <template v-slot:title>
                <h1>
                  {{ item.title }}
                </h1>
              </template>
            </CardComponent>
          </v-col>
        </v-row>
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
import Pagination from '../utilities/Pagination'
import CardComponent from '../utilities/CardComponent'
import CardFilterAnime from '../utilities/CardFilterAnime'
export default {
  name: 'AnimeGenre',
  components: {
    Pagination,
    CardComponent,
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
      selectedGenre: (state) => state.Anime.selectedGenre,
      animes: (state) => state.Anime.animeGenres,
      tags: (state) => state.Anime.tags,
      lastPageVisible: (state) => state.Anime.lastPageVisible
    })
  }
}
</script>
