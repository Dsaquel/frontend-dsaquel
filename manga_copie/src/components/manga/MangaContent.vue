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
      <div v-if="userSelectedManga">
        <div v-for="manga in mangaPreferenceUser" :key="manga.id">
          {{ manga.entry.title }}
        </div>
      </div>
      <PreferenceUser @preferenceUser="preferenceUser" v-else />
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
    userSelectedManga: false,
    selected: ''
  }),
  watch: {
    mangaPreferenceUser () {
      this.userSelectedManga = true
    }
  },
  methods: {
    affectTag (tag) {
      this.selected = tag
    },
    sendPagination (page) {
      this.page = page
    },
    preferenceUser (idManga) {
      this.$store.dispatch('Manga/getMangaPreferenceUser', idManga)
    }
  },
  computed: {
    ...mapState({
      topManga: (state) => state.Home.topManga,
      mangaPreferenceUser: (state) => state.Manga.mangaPreferenceUser,
      mangaReviewsManga: (state) => state.Manga.mangaReviewsManga,
      mangaRecommendations: (state) => state.Manga.mangaRecommendations
    })
  }
}
</script>
