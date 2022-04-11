<template>
  <v-row class="ma-auto">
    <v-col class="ma-auto d-block justify-center" cols="8">
      <CardFilterAnime />
    </v-col>
    <v-col cols="12" lg="8">
      <v-container>
        <v-carousel
          cycle
          height="450"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-sheet color="red" elevation="8">
            <v-container>
              <v-carousel-item v-for="(mangas, i) in carousel" :key="i">
                <v-row class="fill-height" align="center" justify="center">
                  <v-col cols="12" lg="3" v-for="(manga, i) in mangas" :key="i">
                    <v-card max-width="200">
                      <v-img
                        :aspect-ratio="4 / 5"
                        :src="manga.images.jpg.image_url"
                      ></v-img>
                      <v-card-text>
                        {{ manga.title }}
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-container>
          </v-sheet>
        </v-carousel>
      </v-container>

      <v-sheet class="mx-auto" elevation="5">
        <v-slide-group
          class="ma-2 pa-2"
          center-active
          show-arrows="always"
        >
          <v-slide-item v-for="(item, i) in animeSeasonNow" :value="i" :key="i">
            <CardComponentAnime :item="item" />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
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
  mounted () {
    const size = 4
    const arrayOfArrays = []
    for (let i = 0; i < this.animeUpcoming.length; i += size) {
      arrayOfArrays.push(this.animeUpcoming.slice(i, i + size))
    }
    this.carousel = arrayOfArrays
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
    })
  }
}
</script>

<style lang="css">
.v-slide-group:not(.v-slide-group--has-affixes) .v-slide-group__next {
display: flex;
}
</style>
