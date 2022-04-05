<template>
  <v-container>
    <v-card>
      <h2>{{ anime.title }}</h2>
      <v-row justify="center">
        <v-col cols="12" lg="2">
          <v-img max-width="280" :src="anime.images.jpg.image_url"></v-img>
        </v-col>
        <v-col cols="12" lg="8">
          <v-card-text>
            Synopsis: <br />
            {{ anime.synopsis }}
            <br />
            genres:
            <template v-for="genre in anime.genres">
              {{ genre.name }}
              <template v-if="anime.genres.slice(-1)[0] !== genre">
                |
              </template>
            </template>
            <br>
            date sortie : {{ anime.year }}
          </v-card-text>
        </v-col>
        <v-col cols="12">
          <h2>Trailer</h2>
          <iframe
            height="100%"
            width="100%"
            :src="anime.trailer.embed_url"
            frameborder="0"
          ></iframe>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'DetailsAnime',
  beforeMount () {
    this.$store.dispatch('Anime/getAnime', this.$route.params.id)
  },
  beforeDestroy () {
    this.$store.commit('Anime/setAnime', null)
  },
  computed: {
    anime () {
      return this.$store.state.Anime.anime
    }
  }
}
</script>
