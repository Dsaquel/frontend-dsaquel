<template>
          <v-sheet class="mx-auto" elevation="5">
        <v-slide-group show-arrows="always">
          <v-slide-item v-for="(item, i) in mangas" :key="i">
            <CardComponentManga :item="item" />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LibraryContent',

  beforeCreate () {
    this.$store.user.dispatch('User/getUserStuff')
  },
  computed: {
    ...mapState({
      mangas: (state) => state.user.mangas
    })
  }
}
</script>
