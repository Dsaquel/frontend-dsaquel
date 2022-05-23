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
        <v-carousel v-if="animeUpcoming"
          cycle
          height="450"
          show-arrows-on-hover
          hide-delimiters
        >
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
                  max-width="250"
                  height="100%"
                  flat
                >
                  <v-img :src.sync="anime.image.jpg.large" />

                  <v-card-text class="text-truncate">
                    {{ anime.title.default }}
                  </v-card-text>

                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <SlideCardLoader v-else />

      <v-sheet
        class="mx-auto"
        elevation="5"
      >
        <div class="ml-5 text-h4">Current anime aired</div>
        <v-slide-group v-if="animeSeasonNow"
          class="my-2"
          center-active
          show-arrows="always"
        >
          <v-slide-item
            v-for="(item, i) in animeSeasonNow"
            :value="i"
            :key="i"
          >
            <CardComponentAnime :item="item" :i="i" />
          </v-slide-item>
        </v-slide-group>
        <SlideCardLoader v-else />
      </v-sheet>
    </v-col>

    <v-col
      cols="12"
      lg="4"
    >
      <Reviews
      v-if="topReviewsAnime"
        :item.sync="topReviewsAnime[page]"
        @sendPagination="sendPagination"
        :topReviewsAnime="topReviewsAnime.length"
      />
      <v-skeleton-loader v-else loading type="card-avatar, article, actions" elevation="10"></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
// import
import Reviews from '../utilities/Reviews'
import CardFilterAnime from '../utilities/CardFilterAnime'
import SlideCardLoader from '../utilities/SlideCardLoader'
import CardComponentAnime from '../utilities/CardComponentAnime'

export default {
  name: 'AnimeContent',
  components: {
    Reviews,
    CardFilterAnime,
    SlideCardLoader,
    CardComponentAnime
  },
  beforeCreate: function () {
    if (this.$route.query.filter) {
      this.$router.replace({ name: 'animeFilter', query: { filter: this.$route.query.filter } })
    }
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
        if (newVal !== null) {
          const size =
            this.$vuetify.breakpoint.width >= 1200
              ? 4
              : this.$vuetify.breakpoint.width >= 800
                ? 3
                : 2
          for (let i = 0; i < newVal.length; i += size) {
            this.carousel.push(newVal.slice(i, i + size))
          }
        }
      }
    }
  },
  methods: {
    affectTag: (tag) => {
      this.genres = tag
    },
    sendPagination: (page) => {
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
