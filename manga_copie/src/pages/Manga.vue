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
    this.$store.dispatch('Manga/getMangaReviewsManga')
  }
}
</script>
