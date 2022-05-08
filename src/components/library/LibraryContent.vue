<template>
<v-container>
        <v-sheet class="mx-auto" elevation="5" v-if="mangas.length !== 0">
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
      <div class="font-italic" v-else>nothing to show about manga</div>
      <v-sheet class="mx-auto" elevation="5" v-if="animes.length !== 0">
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
      <div class="font-italic" v-else>nothing to show about anime</div>
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
    this.$store.dispatch('Account/GET_USER_STUFF')
  },
  methods: {
    deleteStuff (_id) {
      this.$store.dispatch('Account/DELETE_USER_STUFF', _id)
    }
  },
  computed: {
    ...mapGetters({
      mangas: 'Account/mangas',
      animes: 'Account/animes'
    })
  }
}
</script>
