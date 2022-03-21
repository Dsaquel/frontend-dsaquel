<template>
  <v-container>
    <h1>Je suis MangaList.vue !</h1>
    <v-row class="d-flex justify-center">
      <v-card
        align
        class="d-flex align-center flex-column text-center ma-3"
        v-for="(manga, index) in mangasListContent"
        :key="index"
      >
        <v-card-title>
          {{ manga.title }}
        </v-card-title>

        <v-img :src="manga.images.webp.image_url" />
        <v-card-actions>
          <v-btn :href="manga.url"> Continuer </v-btn>
        </v-card-actions>
      </v-card>
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
export default {
  name: 'MangaList',
  data () {
    return {
      page: 1
    }
  },

  beforeCreate () {
    this.$store.dispatch('Mangas/getMangaList', this.$store.state.Mangas.mangaList)
  },
  mounted () {
    console.log(this.$store.state.Mangas.mangaList)
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
