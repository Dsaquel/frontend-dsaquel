<template>
  <v-container>
    <DataContent>
      <template v-slot:searchData>
        <input type="text" placeholder="Rechercher un manga" />
      </template>
      <template v-slot:mangaContent>
        <v-slide-group>
          <v-slide-item v-for="(item, i) in topManga" :key="i">
            <CardComponent :item="item" />
          </v-slide-item>
        </v-slide-group>
        <Reviews :item="mangaReviewsManga[27]" />
      </template>
    </DataContent>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '../utilities/CardComponent.vue'
import DataContent from '../utilities/DataContent'
import Reviews from '../utilities/Reviews'
export default {
  name: 'MangaContent',
  components: {
    DataContent,
    CardComponent,
    Reviews
  },
  computed: {
    ...mapState({
      mangaRecommendations: (state) => state.Manga.mangaRecommendations,
      topManga: (state) => state.Home.topManga,
      mangaReviewsManga: (state) => state.Manga.mangaReviewsManga
    })
  }
}
</script>
