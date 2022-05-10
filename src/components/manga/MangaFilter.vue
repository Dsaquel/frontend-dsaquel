<template>
  <v-container>
    <CardFilterManga />
    <v-row>
      <v-col
        cols="10"
        lg="2"
        md="3"
        sm="3"
        v-for="(item, i) in mangaFiltered"
        :key="i"
      >
        <DefaultItem :to="'detailManga'" :item="item" />
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
import DefaultItem from '../utilities/DefaultItem'
import CardFilterManga from '../utilities/CardFilterManga'
export default {
  name: 'MangaFilter',
  components: {
    Pagination,
    DefaultItem,
    CardFilterManga
  },
  data: () => ({
    selected: ''
  }),
  beforeCreate () {
    const query = this.$route.query.filter
    this.$store.dispatch('Manga/GET_MANGA_FILTERED', query)
  },
  methods: {
    getPagination (page) {
      const query = this.$route.query.filter
      const params = new URLSearchParams(query)
      params.set('page', page)
      const newQuery = params.toString()
      this.$router.push({ query: { filter: newQuery } })
    },
    affectTag (tag) {
      this.selected = tag
    }
  },
  computed: {
    ...mapState({
      mangaFiltered: (state) => state.Manga.mangaFiltered,
      lastPageVisible: (state) => state.Manga.lastPageVisible
    })
  }
}
</script>
