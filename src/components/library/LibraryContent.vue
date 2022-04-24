<template>
<v-container>

          <v-sheet class="mx-auto" elevation="5">
        <v-slide-group show-arrows="always">
          <v-slide-item v-for="(item, i) in mangas" :key="i">
            <CardComponentManga :item="item" />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-sheet class="mx-auto" elevation="5">
        <v-slide-group show-arrows="always">
          <v-slide-item v-for="(item, i) in animes" :key="i">
            <CardComponentAnime :item="item" />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CardComponentManga from '../utilities/CardComponentManga'
import CardComponentAnime from '../utilities/CardComponentAnime'
export default {
  name: 'LibraryContent',
  components: {
    CardComponentManga,
    CardComponentAnime
  },

  beforeCreate () {
    this.$store.dispatch('User/getUserStuff')
  },
  computed: {
    ...mapGetters({
      mangas: 'User/mangas',
      animes: 'User/animes'
    })
  }
}
</script>
