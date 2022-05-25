<template>
  <v-row class="ma-auto">
    <v-col class="mx-auto d-block justify-center" cols="8">
      <CardFilterManga />
    </v-col>
    <v-col cols="12" lg="8">
      <v-sheet class="mx-auto" elevation="5">
        <div class="text-h5">Top manga</div>
        <v-slide-group v-if="topManga" class="my-2" show-arrows="always">
          <v-slide-item v-for="(item, i) in topManga" :key="i">
            <CardComponentManga :item="item" :i="i" />
          </v-slide-item>
        </v-slide-group>
        <SlideCardLoader v-else />
      </v-sheet>
      <v-sheet class="mx-auto" elevation="5">
        <div class="text-h5">Most favorites manga</div>
        <v-slide-group v-if="mostMangaFavorites" class="my-2" show-arrows="always">
          <v-slide-item v-for="(item, i) in mostMangaFavorites" :key="i">
            <CardComponentManga :item="item" :i="i" />
          </v-slide-item>
        </v-slide-group>
        <SlideCardLoader v-else />
      </v-sheet>
    </v-col>
    <v-col cols="12" lg="4">
      <div v-if="mangaRecommendations === null">
        <PickManga @sendPicking="sendPicking" />
      </div>
      <div v-else>
        <v-btn @click="resetPick">reset your pick ?</v-btn>
        <h2>concerning recommendation of {{ currentRecommendationTitle }}</h2>
        <Recommendation
          v-if="mangaRecommendations"
          @sendPagination="sendPagination"
          :item="mangaRecommendations[page]"
          :recommendation="mangaRecommendations.length"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import PickManga from '../utilities/PickManga'
import Recommendation from '../utilities/Recommendation'
import CardFilterManga from '../utilities/CardFilterManga'
import SlideCardLoader from '../utilities/SlideCardLoader'
import CardComponentManga from '../utilities/CardComponentManga'

export default {
  name: 'MangaContent',
  components: {
    PickManga,
    Recommendation,
    CardFilterManga,
    SlideCardLoader,
    CardComponentManga
  },
  data: () => ({
    page: 1,
    selected: '',
    progressBar: false
  }),
  beforeCreate: function () {
    if (this.$route.query.filter) {
      this.$router.replace({ name: 'mangaFilter', query: { filter: this.$route.query.filter } })
    }
  },
  methods: {
    affectTag: function (tag) {
      this.selected = tag
    },
    sendPagination: function (page) {
      this.page = page
    },
    sendPicking: function (idManga) {
      this.progressBar = true
      this.$store.dispatch('Manga/GET_MANGA_RECOMMENDATIONS', idManga)
    },
    resetPick: function () {
      this.$store.commit('Manga/SET_MANGA_RECOMMENDATIONS', { data: null })
      this.$store.state.Manga.mangaRecommendations = null
    }
  },
  computed: {
    ...mapState({
      mangaReviewsManga: (state) => state.Manga.mangaReviewsManga,
      mangaRecommendations: (state) => state.Manga.mangaRecommendations,
      currentRecommendationTitle: (state) =>
        state.Manga.currentRecommendationTitle
    }),
    ...mapGetters({
      topManga: 'Home/topManga',
      mostMangaFavorites: 'Manga/mostMangaFavorites'
    })
  }
}
</script>
