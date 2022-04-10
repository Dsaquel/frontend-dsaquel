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
  beforeMount () {
    const query = this.$route.query.filter
    console.log(query)
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
      mangaFiltered: (state) => state.Manga.mangaFiltered,
      lastPageVisible: (state) => state.Manga.lastPageVisible
    })
  }
}
</script>
