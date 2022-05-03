<template>
  <v-row class="ma-auto">
    <v-col class="mx-auto d-block justify-center" cols="8">
      <CardFilterManga />
    </v-col>
    <v-col cols="12" lg="8">
      <v-sheet class="mx-auto" elevation="5">
        <div class="text-h4">Top manga</div>
        <v-slide-group show-arrows="always">
          <v-slide-item v-for="(item, i) in topManga" :key="i">
            <CardComponentManga :item="item" />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-sheet class="mx-auto" elevation="5">
        <div class="text-h4">Most favorites manga</div>
        <v-slide-group show-arrows="always">
          <v-slide-item v-for="(item, i) in mostMangaFavorites" :key="i">
            <CardComponentManga :item="item" />
          </v-slide-item>
        </v-slide-group>
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
  watch: {
    topManga: {
      immediate: true,
      handler (newVal, oldVal) {
        newVal
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      }
    }
  },
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
      mangaReviewsManga: (state) => state.Manga.mangaReviewsManga,
      mangaRecommendations: (state) => state.Manga.mangaRecommendations,
      currentRecommendationTitle: (state) =>
        state.Manga.currentRecommendationTitle
    }),
    ...mapGetters({
      mostMangaFavorites: 'Manga/mostMangaFavorites',
      topManga: 'Home/topManga'
    })
  }
}
</script>
