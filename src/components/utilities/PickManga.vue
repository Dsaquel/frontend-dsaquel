<template>
<v-container>
<div class="text-h3">
      Pick a manga
    </div>
  <v-row v-if="pickMangas" align="center">
    <v-col v-for="manga in pickMangas" :key="manga.id" lg="4" md="3">
      <v-card class="d-flex align-center">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                v-on="on"
                class="blur"
                v-bind="attrs"
                :src="manga.image.jpg.medium"
                @click="sendPicking(manga.id, manga.title.default)"
                style="cursor: pointer"
              />
            </template>
            <v-card>
              <v-card-title>Information {{ manga.title.default }}</v-card-title>
              <v-card-text>
                <p>
                author:
                <template v-for="author in manga.authors">
                  {{ author.name }}
                  <template v-if="manga.authors.slice(-1)[0] !== author">
                    |
                  </template>
                </template>
                </p>
                <p>score: {{ manga.score }}</p>
                <br />
              </v-card-text>
              <v-card-text
                >genres:
                <template v-for="genre in manga.genres">
                  {{ genre.name }}
                  <template v-if="manga.genres.slice(-1)[0] !== genre">
                    |
                  </template>
                </template>
              </v-card-text>
            </v-card>
          </v-tooltip>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else align="center">
    <v-col v-for="n in 9" :key="n" lg="4" md="3">
      <v-skeleton-loader loading type="image" ></v-skeleton-loader>
    </v-col>
  </v-row>
</v-container>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PickManga',
  data: () => ({
    isBlur: false
  }),
  methods: {
    sendPicking (idManga, title) {
      this.$store.state.Manga.currentRecommendationTitle = title
      this.$emit('sendPicking', idManga)
    }
  },
  computed: {
    ...mapGetters({
      pickMangas: 'Manga/pickMangas'
    })
  }
}
</script>

<style scoped>
.blur {
  transition: all 1s ease-out;
}
.blur:hover {
  filter: blur(4px);
  -webkit-filter: blur(4px);
  opacity: 0.87;
}
</style>
