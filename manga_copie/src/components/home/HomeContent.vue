<template>
  <div>
    <v-container>
      <v-Text-field
        @keyup.enter="getAnimes"
        v-model="searchQuery"
        label="Recherche..."
        placeholder="One piece"
      />

      <v-progress-linear
        v-if="this.$store.state.Mangas.isLoading"
        indeterminate
        color="green"
      ></v-progress-linear>
      <div v-for="(mangas, i) in homeContent" :key="i">
        <router-link @click.native="sendAPIPath(mangas.promise)" :to="{path: 'manga-list/'+mangas.promise}">{{ mangas.name }}</router-link>
        <SlideCard :mangas="mangas" />
      </div>
    </v-container>
  </div>
</template>

<script>
import SlideCard from './SlideCard.vue'
export default {
  name: 'HomeContent',
  components: { SlideCard },
  data () {
    return {
      searchQuery: '',
      model: null
    }
  },
  methods: {
    getAnimes () {
      this.$store.dispatch('Mangas/getSearchMangas', this.searchQuery)
    },
    sendAPIPath (path) {
      this.$store.state.Mangas.mangaList = path
    }
  },
  mounted () {
    this.$store.dispatch('Mangas/getDefautMangas', this.homeContent.length)
  },
  computed: {
    homeContent () {
      return this.$store.state.Mangas.homeContent
    },
    animes () {
      return this.$store.state.Mangas.animes
    }
  }
}
</script>
