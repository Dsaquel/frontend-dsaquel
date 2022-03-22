<template>
  <v-container>
    <v-container v-if="mangasListContent.name === 'top/anime'">
      <h1>Top anime</h1>
      <v-row class="d-flex justify-center">
        <v-col v-for="(manga, index) in mangasListContent.data" :key="index">
          <MangaCard :manga="manga">
            <template v-slot:title>{{ manga.title }}</template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ manga.title }}
              </p>

              <p class="font-weight-medium">Score: {{ manga.score }}/10</p>
              <p class="font-weight-medium">Date de sortie: {{ manga.year }}</p>
              <p class="font-weight-medium">
                Genres:
                <template v-for="genre in manga.genres">
                  {{ genre.name }}
                </template>
              </p>
              <p class="font-weight-medium">
                Nombre d'épisodes: {{ manga.episodes }}
              </p>
            </template>
          </MangaCard>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="mangasListContent.name === 'top/manga'">
      <h1>Top manga</h1>

      <v-row class="d-flex justify-center">
        <v-col v-for="(manga, index) in mangasListContent.data" :key="index">
          <MangaCard :manga="manga">
            <template v-slot:title>{{ manga.title }}</template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ manga.title }}
              </p>
              <p class="font-weight-medium">
                Auteur:
                <template v-for="author in manga.authors">
                  {{ author.name }}
                </template>
              </p>
              <p class="font-weight-medium">
                Themes:
                <template v-for="theme in manga.themes">
                  {{ theme.name }}
                </template>
              </p>
              <p class="font-weight-medium">volumes: {{ manga.volumes }}</p>
              <p class="font-weight-medium">Chapitres: {{ manga.chapters }}</p>
              <p class="font-weight-medium">
                Nombres de favoris: {{ manga.favorites }}
              </p>
            </template>
          </MangaCard>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="mangasListContent.name === 'top/characters'">
      <h1>Les meilleurs personnages</h1>

      <v-row class="d-flex justify-center">
        <v-col v-for="(manga, index) in mangasListContent.data" :key="index">
          <MangaCard :manga="manga">
            <template v-slot:title>{{ manga.name }}</template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ manga.title }}
              </p>
              <p class="font-weight-medium">
                Nom Japonais: {{ manga.name_kanji }}
              </p>
              <div class="font-weight-medium" v-if="manga.nicknames.length > 0">
                Surnoms:
                <p v-for="(nickname, i) in manga.nicknames" :key="i">
                  {{ nickname }}
                </p>
              </div>
              <p class="font-weight-medium">
                Nombre de favoris: {{ manga.favorites }}
              </p>
            </template>
          </MangaCard>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else>
      <h1>Top anime</h1>
      <v-row class="d-flex justify-center">
        <v-col v-for="(manga, index) in mangasListContent.data" :key="index">
          <MangaCard :manga="manga">
            <template v-slot:title>{{ manga.title }}</template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ manga.title }}
              </p>

              <p class="font-weight-medium">Score: {{ manga.score }}/10</p>
              <p class="font-weight-medium">Date de sortie: {{ manga.year }}</p>
              <p class="font-weight-medium">
                Genres:
                <template v-for="genre in manga.genres">
                  {{ genre.name }}
                </template>
              </p>
              <p class="font-weight-medium">
                Nombre d'épisodes: {{ manga.episodes }}
              </p>
            </template>
          </MangaCard>
        </v-col>
      </v-row>
    </v-container>

    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="lastPageVisible"
        :total-visible="7"
        @input="getMangasPage"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import MangaCard from './MangaCard'

export default {
  name: 'MangaListContent',
  components: {
    MangaCard
  },
  data () {
    return {
      page: 1
    }
  },

  beforeMount () {
    this.$store.dispatch(
      'Mangas/getMangaList',
      this.$store.state.Mangas.mangaList
    )
  },
  methods: {
    getMangasPage () {
      this.$store.dispatch('Mangas/getMangasPage', this.page)
    }
  },

  computed: {
    mangasListContent () {
      return this.$store.state.Mangas.mangasListContent
    },
    lastPageVisible () {
      return this.$store.state.Mangas.lastPageVisible
    }
  }
}
</script>
