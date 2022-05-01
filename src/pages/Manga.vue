<template>
    <MangaContent />
</template>

<script>
import MangaContent from '../components/manga/MangaContent'
export default {
  name: 'Manga',
  components: {
    MangaContent
  },
  beforeMount () {
    this.$store.dispatch('Home/getTopManga')
    this.$store.dispatch('Manga/getMostFavoritesManga')
    this.$store.dispatch('Manga/pickMangas')
  }
}
</script>
