<template>
  <v-container>
    <v-card>
      <h2>{{ anime.title.default }}</h2>
      <v-row justify="center">
        <v-col cols="12" lg="2">
          <v-img max-width="280" :src="anime.image.jpg.medium"></v-img>
          <p class="subtitle-1">
            Genres:<template v-for="genre in anime.genres">
              {{ genre.name }}
              <template v-if="anime.genres.slice(-1)[0] !== genre">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="anime.year !== null">
            {{ anime.year }}
          </p>
          <p class="subtitle-1" v-if="anime.producers !== null">
            Poducers:
            <template v-for="producer in anime.producers">
              {{ producer.name }}
              <template v-if="anime.producers.slice(-1)[0] !== producer">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="anime.studios !== null">
            Studios:
            <template v-for="studio in anime.studios">
              {{ studio.name }}
              <template v-if="anime.studios.slice(-1)[0] !== studio">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="anime.rating !== null">
            Rating: {{ anime.rating }}
          </p>
          <p class="subtitle-1" v-if="anime.score !== null">
            Score: {{ anime.score }}
          </p>
          <p class="subtitle-1" v-if="anime.themes !== null">
            Themes :
            <template v-for="theme in anime.themes">
              {{ theme.name }}
              <template v-if="anime.themes.slice(-1)[0] !== theme">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="anime.type !== null">
            Type : {{ anime.type }}
          </p>
          <v-btn @click="insertAnime">Insert anime</v-btn>
        </v-col>
        <v-col cols="12" lg="8">
          <v-card-text>
            <p class="body-1" v-if="anime.synopsis !== null">
              Synopsis: {{ anime.synopsis }}
            </p>
            <div class="containerIframe">
              <iframe
              v-if="anime.trailer !== null"
                class="iframe"
                :src="anime.trailer.embedUrl"
              ></iframe>
            </div>
          </v-card-text>
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
  methods: {
    insertAnime () {
      this.$store.dispatch('Anime/insertAnime', this.anime)
    }
  },
  computed: {
    anime () {
      return this.$store.state.Anime.anime
    }
  }
}
</script>

<style lang="scss" scoped>
.iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
}
.containerIframe {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 66.66%;
}
</style>
