<template>
  <v-container>
    <CardFilterManga />
    <v-btn @click="show = !show">sort
      <v-icon v-text="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
    </v-btn>
    <v-radio-group  v-show="show" v-model="radioGroup">
      <v-radio
        v-for="order in orders"
        @change="getSort(order)"
        :key="order"
        :label="order"
        :value="order"
      />
    </v-radio-group>
    <v-row v-if="mangaFiltered">
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
    <v-row v-else>
      <v-col
        cols="12"
        lg="2"
        md="3"
        sm="3"
        v-for="n in 10"
        :key="n"
      >
        <v-skeleton-loader type="card" loading width="200"></v-skeleton-loader>
      </v-col>
    </v-row>
    <Pagination
      v-if="lastPageVisible"
      :lastPageVisible="lastPageVisible"
      @getPagination="getPagination"
    />
    <v-skeleton-loader v-else width="200" loading type="actions" />
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
    show: false,
    orders: [
      'members',
      'title',
      'start_date',
      'end_date',
      'volumes',
      'scored_by',
      'rank',
      'popularity',
      'favorites',
      'chapters'
    ],
    selected: '',
    radioGroup: ''
  }),
  beforeCreate: function () {
    const query = this.$route.query.filter
    this.$store.dispatch('Manga/GET_MANGA_FILTERED', query)
  },
  mounted () {
    const query = this.$route.query.filter
    const params = new URLSearchParams(query)
    this.radioGroup = params.get('order_by').toString()
  },
  methods: {
    getSort (selected) {
      const query = this.$route.query.filter
      const params = new URLSearchParams(query)
      params.set('order_by', selected)
      const newQuery = params.toString()
      this.$router.push({ query: { filter: newQuery } })
    },
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
