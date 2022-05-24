<template>
  <AnimeContent />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AnimeContent from '../components/anime/AnimeContent'
export default {
  name: 'Anime',
  components: {
    AnimeContent
  },

  beforeCreate () {
    this.$store.dispatch('Home/GET_ANIME_UPCOMING')
    this.$store.dispatch('Anime/GET_REVIEWS_ANIME')
    this.$store.dispatch('Anime/GET_ANIME_SEASON_NOW')
  },
  computed: {
    ...mapState({
      animes: (state) => state.Anime.animes,
      homeContent: (state) => state.Home.homeContent
    }),
    ...mapActions({
      upcoming: 'Home/GET_ANIME_UPCOMING',
      reviews: 'Anime/GET_REVIEWS_ANIME',
      seasonNow: 'Anime/GET_ANIME_SEASON_NOW'
    })
  }
}
</script>
