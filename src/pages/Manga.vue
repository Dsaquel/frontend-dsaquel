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
    this.$store.dispatch('Home/GET_TOP_MANGA')
    this.$store.dispatch('Manga/GET_MOST_FAVORITES_MANGA')
    this.$store.dispatch('Manga/GET_PICK_MANGA')
  }
}
</script>
