<template>
  <v-row class="mx-auto">
    <v-col cols="12">
      <CardFilterManga />
    </v-col>
    <v-col cols="12" lg="8">
      <v-slide-group>
        <v-slide-item v-for="(item, i) in topManga" :key="i">
          <CardComponentManga :item="item" />
        </v-slide-item>
      </v-slide-group>

      <v-slide-group>
        <v-slide-item v-for="(item, i) in mostMangaFavorites" :key="i">
          <CardComponentManga :item="item" />
        </v-slide-item>
      </v-slide-group>
    </v-col>
    <v-col cols="12" lg="4">
      <div v-if="mangaRecommendations === null">
        <PickManga @sendPicking="sendPicking" />
      </div>
      <div v-else>
        <v-btn @click="resetPick">reset les preferences ?</v-btn>
        <h2>Recommendation concernant {{ currentRecommendationTitle }}</h2>
        <Recommendation
          @sendPagination="sendPagination"
          :item="mangaRecommendations[page]"
          :recommendation="mangaRecommendations.length"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import PickManga from '../utilities/PickManga'
import CardComponentManga from '../utilities/CardComponentManga'
import Recommendation from '../utilities/Recommendation'
import CardFilterManga from '../utilities/CardFilterManga'
export default {
  name: 'MangaContent',
  components: {
    PickManga,
    CardComponentManga,
    Recommendation,
    CardFilterManga
  },
  data: () => ({
    page: 1,
    selected: ''
  }),
  methods: {
    affectTag (tag) {
      this.selected = tag
    },
    sendPagination (page) {
      this.page = page
    },
    sendPicking (idManga) {
      this.$store.dispatch('Manga/getMangaRecommendation', idManga)
    },
    resetPick () {
      this.$store.state.Manga.mangaRecommendations = null
    }
  },
  computed: {
    ...mapState({
      topManga: (state) => state.Home.topManga,
      mangaReviewsManga: (state) => state.Manga.mangaReviewsManga,
      mostMangaFavorites: (state) => state.Manga.mostMangaFavorites,
      mangaRecommendations: (state) => state.Manga.mangaRecommendations,
      currentRecommendationTitle: (state) =>
        state.Manga.currentRecommendationTitle
    })
  }
}
</script>
