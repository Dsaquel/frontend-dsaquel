<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col v-for="(item, index) in animes" :key="index">
        <CardComponent :item="item">
          <template v-slot:title>
            <h1>
              {{ item.title }}
            </h1>
          </template>
        </CardComponent>
      </v-col>
    </v-row>
    <Pagination :lastPageVisible="lastPageVisible" @getPagination="getPagination" />
  </v-container>
</template>

<script>
import CardComponent from '../utilities/CardComponent'
import Pagination from '../utilities/Pagination'
import { mapState } from 'vuex'
export default {
  name: 'AnimeGenre',
  components: {
    CardComponent,
    Pagination
  },
  beforeMount () {
    this.$store.dispatch('Anime/getAnimeGenres', this.$route.params.genreId)
  },
  methods: {
    getPagination (page) {
      this.$store.dispatch('Anime/getPagination', page)
    }
  },
  computed: {
    ...mapState({
      animes: (state) => state.Anime.animeGenres,
      lastPageVisible: (state) => state.Anime.lastPageVisible
    })
  }
}
</script>
