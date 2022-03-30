<template>
  <v-container>
    <v-row>
      <CardFilterGenders @affectTag="affectTag">
        <template v-slot:toAnime>
          <v-btn
            color="primary"
            text

            :to="{ name: 'animeGenre', params: { genreId: selected } }"
          >
            Save
          </v-btn>
        </template>
      </CardFilterGenders>
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
import CardFilterGenders from '../utilities/CardFilterGenders'
export default {
  name: 'AnimeGenre',
  components: {
    Pagination,
    CardComponent,
    CardFilterGenders
  },
  data: () => ({
    selected: ''
  }),
  beforeMount () {
    const genre = this.tags.find(
      (genre) => genre.name === this.$route.params.genreId
    )
    this.$store.dispatch('Anime/getAnimeGenres', genre.id)
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
