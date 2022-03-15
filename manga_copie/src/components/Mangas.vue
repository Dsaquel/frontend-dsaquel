<template>
  <v-container>
    <v-Text-field
      @keyup.enter="getAnimes"
      v-model="searchQuery"
      label="Recherche..."
      placeholder="One piece"
    />
    <v-progress-linear v-if="this.$store.state.Mangas.isLoading" indeterminate color="green"></v-progress-linear>

    <Manga v-else :mangas="mangas" />
  </v-container>
</template>

<script>
import Manga from '@/components/Manga'
export default {
  name: 'Mangas',
  components: {
    Manga
  },
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    getAnimes () {
      this.$store.dispatch('Mangas/getSearchMangas', this.searchQuery)
    }
  },
  beforeMount () {
    this.$store.dispatch('Mangas/getDefautMangas')
  },
  computed: {
    mangas () {
      return this.$store.state.Mangas.mangas
    }
  }
}
</script>
