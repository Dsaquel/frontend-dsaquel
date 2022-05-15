<template>
  <v-container>
    <v-card v-if="manga">
      <h2 v-if="manga.title.default">Manga : {{ manga.title.default }}</h2>
      <v-row justify="center">
        <v-col
          cols="12"
          lg="2"
        >
          <v-img
            v-if="manga.image.jpg.medium"
            width="100%"
            :src="manga.image.jpg.medium"
          ></v-img>
          <p
            class="subtitle-1"
            v-if="manga.authors.length"
          >
            Author:
            <template v-for="author in manga.authors">
              {{ author.name }}
              <template v-if="manga.authors.slice(-1)[0] !== author">
                |
              </template>
            </template>
          </p>
          <p
            class="subtitle-1"
            v-if="manga.chapters"
          >
            chapters: {{ manga.chapters }}
          </p>

          <p
            class="subtitle-1"
            v-if="manga.demographics.length"
          >
            demographic:
            <template v-for="demographic in manga.demographics">
              {{ demographic.name }}
              <template v-if="manga.demographics.slice(-1)[0] !== demographic">
                |
              </template>
            </template>
          </p>
          <p v-if="manga.favorites">
            favorites: {{ manga.favorites }}
          </p>

          <p
            class="subtitle-1"
            v-if="manga.genres.length"
          >
            genre:
            <template v-for="genre in manga.genres">
              {{ genre.name }}
              <template v-if="manga.genres.slice(-1)[0] !== genre">
                |
              </template>
            </template>
          </p>
          <p
            class="subtitle-1"
            v-if="manga.members"
          >
            members: {{ manga.members }}
          </p>
          <p
            class="subtitle-1"
            v-if="manga.publishInfo.status"
          >
            published: {{ manga.publishInfo.status }}
          </p>
          <p
            class="subtitle-1"
            v-if="manga.rank"
          >
            rank: {{ manga.rank }}
          </p>
          <p
            class="subtitle-1"
            v-if="manga.score"
          >
            score: {{ manga.score }}
          </p>
          <p
            class="subtitle-1"
            v-if="manga.serializations.length"
          >
            serialization:
            <template v-for="serialization in manga.serializations">
              {{ serialization.name }}
              <template v-if="manga.serializations.slice(-1)[0] !== serialization">
                |
              </template>
            </template>
          </p>
          <v-btn
            @click="insertManga"
            :loading="loader.insertMangaLoad"
          >Insert manga</v-btn>
        </v-col>
        <v-col
          cols="12"
          lg="8"
        >
          <v-card-text>
            <p
              class="body-1"
              v-if="manga.background"
            >
              History: {{ manga.background }}
            </p>

            <p
              class="body-1"
              v-if="manga.synopsis"
            >
              Synopsis : {{ manga.synopsis }}
            </p>
            <p
              class="subtitle-1"
              v-if="manga.themes.length"
            >
              theme:
              <template v-for="theme in manga.themes">
                {{ theme.name }}
                <template v-if="manga.themes.slice(-1)[0] !== theme">
                  |
                </template>
              </template>
            </p>
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
  name: 'DetailsManga',
  beforeMount () {
    this.$store.dispatch('Manga/GET_MANGA', this.$route.params.id)
  },
  beforeDestroy () {
    this.$store.commit('Manga/SET_MANGA', null)
  },
  methods: {
    insertManga () {
      this.$store.dispatch('Manga/INSERT_MANGA', this.manga)
    }
  },
  computed: {
    ...mapState({
      manga: (state) => state.Manga.manga,
      loader: (state) => state.Manga.loader
    })
  }
}
</script>
