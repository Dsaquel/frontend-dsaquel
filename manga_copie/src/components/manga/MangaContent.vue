<template>
  <v-row class="mx-auto">
    <v-col cols="12">
      <CardFilterManga @affectTag="affectTag">
        <template v-slot:toManga>
          <v-btn
            color="primary"
            text
            :to="{ name: 'mangaGenre', params: { genreId: selected } }"
          >
            Save
          </v-btn>
        </template>
      </CardFilterManga>
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
      <v-sheet min-height="70vh" rounded="lg">
        <PreferenceUser />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '../utilities/CardComponent'
import PreferenceUser from '../utilities/PreferenceUser'
import CardFilterManga from '../utilities/CardFilterManga'
export default {
  name: 'MangaContent',
  components: {
    CardComponent,
    PreferenceUser,
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
    }
  },
  computed: {
    ...mapState({
      topManga: (state) => state.Home.topManga,
      mangaReviewsManga: (state) => state.Manga.mangaReviewsManga,
      mangaRecommendations: (state) => state.Manga.mangaRecommendations
    })
  }
}
</script>
