<template>
  <AnimeContent />
</template>

<script>
import { mapState } from 'vuex'
import AnimeContent from '../components/anime/AnimeContent'
export default {
  name: 'Anime',
  components: {
    AnimeContent
  },

  beforeMount () {
    this.$store.dispatch('Anime/getAnimeSchedules')
    this.$store.dispatch('Anime/getTopReviewsAnime')
  },
  computed: {
    ...mapState({
      homeContent: (state) => state.Home.homeContent,
      animes: (state) => state.Anime.animes
    })
  }
}
</script>
