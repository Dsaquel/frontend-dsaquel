<template>
  <v-container>
    <v-card v-if="anime">
      <h2 v-if="anime.title.default">{{ anime.title.default }}</h2>
      <v-row justify="center">
        <v-col cols="12" lg="2">
          <v-img v-if="anime.image.jpg.medium" width="100%" :src="anime.image.jpg.medium" />
          <p class="subtitle-1" v-if="anime.genres.length">
            Genres:<template v-for="genre in anime.genres">
              {{ genre.name }}
              <template v-if="anime.genres.slice(-1)[0] !== genre">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="anime.year">
            year
            {{ anime.year }}
          </p>
          <p class="subtitle-1" v-if="anime.producers">
            Poducers:
            <template v-for="producer in anime.producers">
              {{ producer.name }}
              <template v-if="anime.producers.slice(-1)[0] !== producer">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="anime.studios.length">
            Studios:
            <template v-for="studio in anime.studios">
              {{ studio.name }}
              <template v-if="anime.studios.slice(-1)[0] !== studio">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="anime.rating">
            Rating: {{ anime.rating }}
          </p>
          <p class="subtitle-1" v-if="anime.score">
            Score: {{ anime.score }}
          </p>
          <p class="subtitle-1" v-if="anime.themes.length">
            Themes :
            <template v-for="theme in anime.themes">
              {{ theme.name }}
              <template v-if="anime.themes.slice(-1)[0] !== theme">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="anime.type">
            Type : {{ anime.type }}
          </p>
          <v-btn @click="insertAnime" :loading="loader.insertAnimeLoad">Insert anime</v-btn>
        </v-col>
        <v-col cols="12" lg="8">
          <v-card-text>
            <p class="body-1" v-if="anime.synopsis">
              Synopsis: {{ anime.synopsis }}
            </p>
            <div class="containerIframe">
              <iframe
              v-if="anime.trailer"
                class="iframe"
                :src="anime.trailer.embedUrl"
              />
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-progress-linear
      v-else
      indeterminate
      color="green"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DetailsAnime',
  data: () => ({
  }),
  beforeMount () {
    this.$store.dispatch('Anime/GET_ANIME', this.$route.params.id)
  },
  mounted () {
    // console.log('toto')
    // this.$store.dispatch('Anime/GET_EPISODE', 'One piece')
  },
  beforeDestroy () {
    this.$store.commit('Anime/SET_ANIME', null)
  },
  methods: {
    insertAnime () {
      this.$store.dispatch('Anime/INSERT_ANIME', this.anime)
      // TODO: delete ?
      // const type = (this.anime.type) ? this.anime.type : 'tv'
      // this.$store.dispatch('Anime/GET_EPISODE', { title: this.anime.title.default, type })
    }
  },
  computed: {
    ...mapState({
      anime: (state) => state.Anime.anime,
      loader: (state) => state.Anime.loader,
      iframe: (state) => state.Anime.iframe
    })
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
