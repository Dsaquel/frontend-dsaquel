<template>
<v-container>
<div class="text-h3">
      Pick a manga
    </div>
  <v-row align="center">
    <v-col v-for="manga in pickMangas" :key="manga.id" cols="12" md="4">
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
</v-container>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PickManga',
  data: () => ({
    isBlur: false
  }),
  watch: {
    pickMangas: {
      immediate: true,
      handler (newVal, oldVal) {
        newVal
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      }
    }
  },
  methods: {
    sendPicking (idManga, title) {
      this.$store.state.Manga.currentRecommendationTitle = title
      this.$emit('sendPicking', idManga)
    }
  },
  computed: {
    ...mapState({
      pickMangas: (state) => state.Manga.pickMangas
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
