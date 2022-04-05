<template>
  <v-container>
    <v-card>
      <h2>{{ manga.title }}</h2>
      <v-row justify="center">
        <v-col cols="12" lg="2">
          <v-img max-width="280" :src="manga.images.jpg.image_url"></v-img>
        </v-col>
        <v-col cols="12" lg="8">
          <v-card-text>
            Synopsis: <br />
            {{ manga.synopsis }}
            <br />
            genres:
            <template v-for="genre in manga.genres">
              {{ genre.name }}
              <template v-if="manga.genres.slice(-1)[0] !== genre">
                |
              </template>
            </template>
            <br />
            date sortie : {{ manga.year }}
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
  computed: {
    manga () {
      return this.$store.state.Manga.manga
    }
  }
}
</script>
