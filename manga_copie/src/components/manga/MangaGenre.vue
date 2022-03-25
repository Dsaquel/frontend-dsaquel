<template>
  <v-container>
    <v-row>
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
import CardFilterGenders from '../utilities/CardFilterGenders'
import CardComponent from '../utilities/CardComponent'
import Pagination from '../utilities/Pagination'
import { mapState } from 'vuex'
export default {
  name: 'MangaGenre',
  components: {
    CardComponent,
    Pagination,
    CardFilterGenders
  },
  data: () => ({
    selected: ''
  }),
  beforeMount () {
    const genre = this.tags.find(
      (genre) => genre.name === this.$route.params.genreId
    )
    this.$store.dispatch('Mangas/getMangaGenres', genre.id)
  },
  methods: {
    getPagination (page) {
      this.$store.dispatch('Mangas/getPagination', page)
    },
    affectTag (tag) {
      this.selected = tag
    }
  },
  computed: {
    ...mapState({
      mangas: (state) => state.Mangas.mangaGenres,
      tags: (state) => state.Mangas.tags,
      lastPageVisible: (state) => state.Mangas.lastPageVisible
    })
  }
}
</script>
