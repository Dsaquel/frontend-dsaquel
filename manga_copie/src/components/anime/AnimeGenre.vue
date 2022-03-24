<template>
  <v-container>
    <v-row>
      <!-- <CardFilterGenders /> -->
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
// import CardFilterGenders from '../utilities/CardFilterGenders'
import CardComponent from '../utilities/CardComponent'
import Pagination from '../utilities/Pagination'
import { mapState } from 'vuex'
export default {
  name: 'AnimeGenre',
  components: {
    CardComponent,
    Pagination
    // CardFilterGenders
  },
  beforeMount () {
    const genre = this.tags.find(
      (genre) => genre.name === this.$route.params.genreId
    )
    console.log(genre)
    this.$store.dispatch('Anime/getAnimeGenres', genre.id)
  },
  methods: {
    getPagination (page) {
      this.$store.dispatch('Anime/getPagination', page)
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
