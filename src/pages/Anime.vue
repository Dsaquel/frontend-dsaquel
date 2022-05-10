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

  beforeCreate () {
    this.$store.dispatch('Home/GET_ANIME_UPCOMING')
    this.$store.dispatch('Anime/GET_REVIEWS_ANIME')
    this.$store.dispatch('Anime/GET_ANIME_SEASON_NOW')
  },
  computed: {
    ...mapState({
      homeContent: (state) => state.Home.homeContent,
      animes: (state) => state.Anime.animes
    })
  }
}
</script>
