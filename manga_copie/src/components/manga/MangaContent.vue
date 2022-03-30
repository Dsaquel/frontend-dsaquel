<template>
  <v-row class="mx-auto">
    <v-col mx-auto cols="12">
      <CardFilterGenders @affectTag="affectTag">
        <template v-slot:toManga>
          <v-btn
            color="primary"
            text
            :to="{ name: 'mangaGenre', params: { genreId: selected } }"
          >
            Save
          </v-btn>
        </template>
      </CardFilterGenders>
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
      <Reviews
        :item.sync="mangaReviewsManga[Number(page)]"
        @sendPagination="sendPagination"
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
  name: 'MangaContent',
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
