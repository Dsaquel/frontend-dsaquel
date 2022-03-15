<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-card
        align
        class="d-flex align-center flex-column text-center ma-3"
        v-for="(manga, index) in mangas"
        :key="index"
      >
        <v-card-title>
          {{ manga.title }}
        </v-card-title>

          <v-img :src="manga.images.webp.image_url" />
          <v-card-actions>
            <v-btn :href="manga.url"> Continuer </v-btn>
            <v-btn href="#"> Ajouter à la bibliothèque </v-btn>
          </v-card-actions>

      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Manga',
  data () {
    return {}
  },
  props: {
    mangas: {
      type: Array
    }
  }
}
</script>

<style scooped lang="scss">
.align-center {
  flex-basis: 15rem;
}
</style>
