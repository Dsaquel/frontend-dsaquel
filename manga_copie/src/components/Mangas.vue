<template>
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

    <v-row class="d-flex justify-center" v-else>
      <v-col v-for="(manga, index) in mangas" :key="index" >
        <Manga :manga="manga">
          <template v-slot:library>
            <v-btn href="#"> Ajouter à la bibliothèque </v-btn>
          </template>
        </Manga>
      </v-col>
    </v-row>
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
      this.$store.state.Mangas.filters.forEach(element => {
        console.log(element.itemList.arrayData)
      })
      this.$store.dispatch('Mangas/getSearchMangas', this.searchQuery)
    },
    getDefaultMangas () {
      this.$store.dispatch('Mangas/getDefautMangas')
    }
  },
  mounted () {
    setTimeout(this.getDefaultMangas, 4000)
  },
  computed: {
    mangas () {
      return this.$store.state.Mangas.mangas
    }
  }
}
</script>
