<template>
  <v-container>
    <v-card>
      <h2>{{ manga.title }}</h2>
      <v-row justify="center">
        <v-col cols="12" lg="2">
          <v-img max-width="280" :src="manga.image.jpg.medium"></v-img>
          <p class="subtitle-1" v-if="manga.authors !== null">
            Author:
            <template v-for="author in manga.authors">
              {{ author.name }}
              <template v-if="manga.authors.slice(-1)[0] !== author">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="manga.chapters !== null">
            chapters: {{ manga.chapters }}
          </p>

          <p class="subtitle-1" v-if="manga.demographics !== null">
            demographic:
            <template v-for="demographic in manga.demographics">
              {{ demographic.name }}
              <template v-if="manga.demographics.slice(-1)[0] !== demographic">
                |
              </template>
            </template>
          </p>
          <p v-if="manga.favorites !== null">
            favorites: {{ manga.favorites }}
          </p>

          <p class="subtitle-1" v-if="manga.genres !== null">
            genre:
            <template v-for="genre in manga.genres">
              {{ genre.name }}
              <template v-if="manga.genres.slice(-1)[0] !== genre">
                |
              </template>
            </template>
          </p>
          <p class="subtitle-1" v-if="manga.members !== null">
            members: {{ manga.members }}
          </p>
          <p class="subtitle-1" v-if="manga.publishInfo.status !== null">
            published: {{ manga.publishInfo.status }}
          </p>
          <p class="subtitle-1" v-if="manga.rank !== null">
            rank: {{ manga.rank }}
          </p>
          <p class="subtitle-1" v-if="manga.score !== null">
            score: {{ manga.score }}
          </p>
          <p class="subtitle-1" v-if="manga.serializations !== null">
            serialization:
            <template v-for="serialization in manga.serializations">
              {{ serialization.name }}
              <template
                v-if="manga.serializations.slice(-1)[0] !== serialization"
              >
                |
              </template>
            </template>
          </p>
          <v-btn @click="insertManga">Insert manga</v-btn>
        </v-col>
        <v-col cols="12" lg="8">
          <v-card-text>
            <p class="body-1" v-if="manga.background !== null">
              History: {{ manga.background }}
            </p>

            <p class="body-1" v-if="manga.synopsis !== null">
              Synopsis : {{ manga.synopsis }}
            </p>
            <p class="subtitle-1" v-if="manga.themes !== null">
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
  </v-container>
</template>

<script>
export default {
  name: 'DetailsManga',
  beforeMount () {
    this.$store.dispatch('Manga/getManga', this.$route.params.id)
  },
  beforeDestroy () {
    this.$store.commit('Manga/setManga', null)
  },
  methods: {
    insertManga () {
      this.$store.dispatch('Manga/insertManga', this.manga)
    }
  },
  computed: {
    manga () {
      return this.$store.state.Manga.manga
    }
  }
}
</script>
