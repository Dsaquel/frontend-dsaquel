<template>
  <div>
    <v-navigation-drawer v-model="$store.state.isNavigationDrawerOpened" clipped app>
      <v-list>
        <v-list-item
          v-for="(item, i) in this.$store.state.Mangas.filters"
          :key="i"
          link
          @click="getGenreMangas(item.mal_id)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <Mangas />
  </div>
</template>

<script>
import Mangas from '@/components/Mangas'
export default {
  name: 'Home',

  components: {
    Mangas
  },
  data () {
    return {
      isOpened: false
    }
  },
  methods: {
    getGenreMangas: function (idGenre) {
      this.$store.dispatch('Mangas/getGenreMangas', idGenre)
    }
  },
  beforeMount () {
    this.$store.dispatch('Mangas/setGenreMangas')
  }
}
</script>
