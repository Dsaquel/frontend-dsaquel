<template>
  <v-container>
    <v-row>
      <CardFilterManga />
      <v-col cols="10">
        <v-row>
          <v-col cols="4" v-for="(item, index) in mangas" :key="index">
            <CardComponent :item="item">
              <template v-slot:title>
                <h1>
                  {{ item.title }}
                </h1>
              </template>
            </CardComponent>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <Pagination
      :lastPageVisible="lastPageVisible"
      @getPagination="getPagination"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '../utilities/Pagination'
import CardComponent from '../utilities/CardComponent'
import CardFilterManga from '../utilities/CardFilterManga'
export default {
  name: 'MangaFilter',
  components: {
    Pagination,
    CardComponent,
    CardFilterManga
  },
  data: () => ({
    selected: ''
  }),
  beforeMount () {
    const query = this.$route.query.filter
    this.$store.dispatch('Manga/getMangaFiltered', query)
  },
  methods: {
    getPagination (page) {
      this.$store.dispatch('Manga/getPagination', page)
    },
    affectTag (tag) {
      this.selected = tag
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.Manga.tags,
      mangas: (state) => state.Manga.mangaGenres,
      lastPageVisible: (state) => state.Manga.lastPageVisible
    })
  }
}
</script>
