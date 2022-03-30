<template>
  <v-row class="mx-auto">
    <v-col cols="12">
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
    </v-col>
    <v-col cols="12" lg="8">
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
    <v-col cols="12" lg="4">
      <Reviews
        :item.sync="topReviewsAnime[page]"
        @sendPagination="sendPagination"
        :topReviewsAnime="topReviewsAnime.length"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import Reviews from '../utilities/Reviews'
import CardComponent from '../utilities/CardComponent'
import CardFilterGenders from '../utilities/CardFilterGenders'
export default {
  name: 'AnimeContent',
  components: {
    Reviews,
    CardComponent,
    CardFilterGenders
  },
  data: () => ({
    page: 1,
    selected: ''
  }),
  methods: {
    getMoreAnime () {
      this.$store.dispatch('Anime/getAnimeSeasonNow')
    },
    affectTag (tag) {
      this.selected = tag
    },
    sendPagination (page) {
      this.page = page
    }
  },
  computed: {
    ...mapState({
      animeUpcoming: (state) => state.Home.animeUpcoming,
      animeSchedules: (state) => state.Anime.animeSchedules,
      animeSeasonNow: (state) => state.Anime.animeSeasonNow,
      topReviewsAnime: (state) => state.Anime.topReviewsAnime
    })
  }
}
</script>
