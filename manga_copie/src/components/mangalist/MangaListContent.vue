<template>
  <v-container>
    <v-row
      v-if="mangasListContent.name === 'top/anime'"
      class="d-flex justify-center"
    >
      <v-col v-for="(manga, index) in mangasListContent.data" :key="index">
        <MangaCard :manga="manga">
          <template v-slot:test>
            <div>Je suis un top anime hihi</div>
          </template>
        </MangaCard>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="lastPageVisible"
        :total-visible="7"
        @input="getMangasPage"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import MangaCard from './MangaCard'

export default {
  name: 'MangaListContent',
  components: {
    MangaCard
  },
  data () {
    return {
      page: 1
    }
  },

  beforeCreate () {
    this.$store.dispatch(
      'Mangas/getMangaList',
      this.$store.state.Mangas.mangaList
    )
  },
  created () {
    console.log(this.$store.state.Mangas.mangasListContent.name)
  },
  methods: {
    getMangasPage () {
      this.$store.dispatch('Mangas/getMangasPage', this.page)
    }
  },

  computed: {
    mangasListContent () {
      return this.$store.state.Mangas.mangasListContent
    },
    lastPageVisible () {
      return this.$store.state.Mangas.lastPageVisible
    }
  }
}
</script>
