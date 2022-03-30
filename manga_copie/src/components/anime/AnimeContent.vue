<template>
  <v-container>
    <v-row>
      <CardFilterGenders @affectTag="affectTag">
        <template v-slot:toAnime>
          <v-btn
            color="primary"
            text
            :to="{ name: 'animeGenre', params: { genreId: selected } }"
          >
            Save
          </v-btn>
        </template>
      </CardFilterGenders>
      <v-col>
        <v-slide-group>
          <v-slide-item v-for="item in animeUpcoming" :key="item.title">
            <CardComponent :item="item" />
          </v-slide-item>
        </v-slide-group>

        <v-slide-group>
          <v-slide-item v-for="item in animeSchedules" :key="item.title">
            <CardComponent :item="item" />
          </v-slide-item>
        </v-slide-group>
        <v-slide-group>
          <v-slide-item v-for="item in animeSeasonNow" :key="item.title">
            <CardComponent :item="item" />
          </v-slide-item>
        </v-slide-group>
        <v-btn fab icon @click="getMoreAnime">
          <v-icon>mdi-eye-plus-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '../utilities/CardComponent'
import CardFilterGenders from '../utilities/CardFilterGenders'
export default {
  name: 'AnimeContent',
  components: {
    CardComponent,
    CardFilterGenders
  },
  data: () => ({
    selected: ''
  }),
  methods: {
    getMoreAnime () {
      this.$store.dispatch('Anime/getAnimeSeasonNow')
    },
    affectTag (tag) {
      this.selected = tag
    }
  },
  computed: {
    ...mapState({
      animeUpcoming: (state) => state.Home.animeUpcoming,
      animeSchedules: (state) => state.Anime.animeSchedules,
      animeSeasonNow: (state) => state.Anime.animeSeasonNow
    })
  }
}
</script>
