<template>
  <v-row class="ma-auto">
    <v-col
      class="ma-auto d-block justify-center"
      cols="8"
    >
      <CardFilterAnime />
    </v-col>
    <v-col
      cols="12"
      lg="8"
    >
      <v-container>
        <v-carousel
          cycle
          height="450"
          show-arrows-on-hover
          hide-delimiters
        >
          <v-sheet elevation="8">
            <div class="text-h4">Anime announced</div>
              <v-carousel-item
                v-for="(animes, i) in carousel"
                :key="i"
                eager
              >
                <v-row
                  align-content-lg="center"
                  justify="center"
                >
                  <v-col
                    lg="3"
                    sm="4"
                    v-for="(anime, i) in animes"
                    :key="i"
                  >
                    <v-card
                      class="flex-wrap"
                      height="100%"
                      flat
                    >
                      <v-img
                        :src.sync="anime.image.jpg.large"
                      />

                      <v-card-text class="text-truncate">
                        {{ anime.title.default }}
                      </v-card-text>

                    </v-card>
                  </v-col>
                </v-row>
              </v-carousel-item>
          </v-sheet>
        </v-carousel>
      </v-container>

      <v-sheet
        class="mx-auto"
        elevation="5"
      >
        <div class="ml-5 text-h4">Current anime aired</div>
        <v-slide-group
          class="ma-2 pa-2"
          center-active
          show-arrows="always"
        >
          <v-slide-item
            v-for="(item, i) in animeSeasonNow"
            :value="i"
            :key="i"
          >
            <CardComponentAnime :item="item" />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-col>

    <v-col
      cols="12"
      lg="4"
    >
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
import CardComponentAnime from '../utilities/CardComponentAnime'
import CardFilterAnime from '../utilities/CardFilterAnime'
export default {
  name: 'AnimeContent',
  components: {
    Reviews,
    CardComponentAnime,
    CardFilterAnime
  },
  data: () => ({
    page: 1,
    model: [],
    genres: null,
    toggle: false,
    carousel: []
  }),
  watch: {
    animeUpcoming: {
      immediate: true,
      handler (newVal, oldVal) {
        const size =
          this.$vuetify.breakpoint.width >= 1200
            ? 4
            : this.$vuetify.breakpoint.width >= 800
              ? 3
              : 2
        const arrayOfArrays = []
        for (let i = 0; i < newVal.length; i += size) {
          arrayOfArrays.push(newVal.slice(i, i + size))
        }
        this.carousel = arrayOfArrays
      }
    }
  },
  methods: {
    affectTag (tag) {
      this.genres = tag
    },
    sendPagination (page) {
      this.page = page
    }
  },
  computed: {
    ...mapState({
      animeUpcoming: (state) => state.Home.animeUpcoming,
      animeSeasonNow: (state) => state.Anime.animeSeasonNow,
      topReviewsAnime: (state) => state.Anime.topReviewsAnime
    }),
    widthScreen () {
      return this.$vuetify.breakpoint.width
    }
  }
}
</script>

<style lang="css" scoped>
.truncate {
  width: 100px;
  height: 90px; /* new */
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  border: 1px solid #ddd;
  margin: 0;
}
.v-slide-group:not(.v-slide-group--has-affixes) .v-slide-group__next {
  display: flex;
}
</style>
