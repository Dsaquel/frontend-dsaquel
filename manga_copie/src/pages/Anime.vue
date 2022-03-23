<template>
  <v-container>
    <h1>Im Anime.vue</h1>
    <!-- TODO: take animes in home -->
    <!-- <div v-for="animes in homeContent" :key="animes">
      <v-row v-if="animes.name === 'Top anime'">
        <v-col v-for="anime in animes.data" :key="anime">
          <v-card>
            <v-card-title>
              {{ anime.title }}
            </v-card-title>
            <v-img :src="anime.images.jpg.image_url"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </div> -->
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Anime',
  beforeMount () {
    this.$store.dispatch('Anime/getAnimeSchedules')
    this.$store.dispatch('Anime/getAnimeSeasonNow')
  },
  computed: {
    ...mapState({
      homeContent: (state) => state.Home.homeContent,
      animes: (state) => state.Anime.animes
    })
  }
}
</script>
