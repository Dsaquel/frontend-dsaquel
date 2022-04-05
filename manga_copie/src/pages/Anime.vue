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
    this.$store.dispatch('Home/getAnimeUpcoming')
    this.$store.dispatch('Anime/getTopReviewsAnime')
    this.$store.dispatch('Anime/getAnimeSeasonNow')
  },
  computed: {
    ...mapState({
      homeContent: (state) => state.Home.homeContent,
      animes: (state) => state.Anime.animes
    })
  }
}
</script>
