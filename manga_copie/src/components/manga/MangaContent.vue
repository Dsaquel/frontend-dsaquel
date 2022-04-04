<template>
  <v-row class="mx-auto">
    <v-col cols="12">
      <CardFilterManga />
    </v-col>
    <v-col cols="12" lg="8">
      <v-sheet color="#FF9800" min-height="70vh" rounded="lg">
        <v-slide-group>
          <v-slide-item v-for="(item, i) in topManga" :key="i">
            <CardComponent :item="item" />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-col>
    <v-col cols="12" lg="4">
      <div v-if="mangaPicking === null">
        <PickManga @sendPicking="sendPicking" />
      </div>
      <!-- TODO: auto slide ? -->
      <div v-else>
        <v-btn @click="resetPick">reset les preferences ?</v-btn>
        <h2>Recommendation concernant {{ currentRecommendationTitle }}</h2>
        <Recommendation @sendPagination="sendPagination" :item="mangaPicking[page]" :recommendation="mangaPicking.length" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import PickManga from '../utilities/PickManga'
import CardComponent from '../utilities/CardComponent'
import Recommendation from '../utilities/Recommendation'
import CardFilterManga from '../utilities/CardFilterManga'
export default {
  name: 'MangaContent',
  components: {
    PickManga,
    CardComponent,
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
      this.$store.dispatch('Manga/getMangaPicking', idManga)
    },
    resetPick () {
      this.$store.state.Manga.mangaPicking = null
    }
  },
  computed: {
    ...mapState({
      topManga: (state) => state.Home.topManga,
      mangaPicking: (state) => state.Manga.mangaPicking,
      mangaReviewsManga: (state) => state.Manga.mangaReviewsManga,
      mangaRecommendations: (state) => state.Manga.mangaRecommendations,
      currentRecommendationTitle: (state) => state.Manga.currentRecommendationTitle
    })
  }
}
</script>
