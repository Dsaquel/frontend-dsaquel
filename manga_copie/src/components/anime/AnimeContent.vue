<template>
  <v-container>
    <v-row>
      <CardFilterGenders />
      <v-col cols="10">
        <v-sheet min-height="70vh" rounded="lg">
          <v-row>
            <v-col cols="4" v-for="n in 15" :key="n">
              <v-sheet elevation="10">sheet numéro {{ n }}</v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardFilterGenders from '../utilities/CardFilterGenders'
import { mapState } from 'vuex'
export default {
  name: 'AnimeContent',
  components: {
    CardFilterGenders
  },
  data: () => ({
  }),
  methods: {
    getAnimeGenres: function () {
      let score = ''
      if (this.score) score = 'toto'
      console.log(score)
      if (this.selected !== '') {
        this.$store.dispatch('Anime/getAnimeGenres', this.selected)
      }
    }
  },
  computed: {
    ...mapState({
      // selectedGenre: (state) => state.Anime.selectedGenre
    })
  }
}
</script>
