<template>
  <v-container>
    <h1>Je suis MangaList.vue !</h1>
    <MangaListContent />
  </v-container>
</template>

<script>
import MangaListContent from '../components/mangalist/MangaListContent'
export default {
  name: 'MangaList',
  components: {
    MangaListContent
  }
}
</script>
