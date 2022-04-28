<template>
<v-container>

          <v-sheet class="mx-auto" elevation="5">
        <v-slide-group show-arrows="always">
          <v-slide-item v-for="(item, i) in mangas" :key="i">
            <CardComponentManga :item="item">
              <template v-slot:delete-stuff>
                <v-btn @click="deleteStuff(item._id)">
                  delete this
                </v-btn>
              </template>
            </CardComponentManga>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-sheet class="mx-auto" elevation="5">
        <v-slide-group show-arrows="always">
          <v-slide-item v-for="(item, i) in animes" :key="i">
            <CardComponentAnime :item="item">
              <template v-slot:delete-stuff>
                <v-btn @click="deleteStuff(item._id)">
                  delete this
                </v-btn>
              </template>
            </CardComponentAnime>
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
  methods: {
    deleteStuff (_id) {
      this.$store.dispatch('User/deleteUserStuff', _id)
    }
  },
  computed: {
    ...mapGetters({
      mangas: 'User/mangas',
      animes: 'User/animes'
    })
  }
}
</script>
