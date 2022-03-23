<template>
    <h1>Je suis {{ anime.title }}</h1>
</template>

<script>
export default {
  name: 'DetailsAnime',
  beforeMount () {
    this.$store.dispatch('Anime/getAnime', this.$route.params.id)
  },
  beforeDestroy () {
    this.$store.commit('Anime/setAnime', null)
  },
  computed: {
    anime () {
      return this.$store.state.Anime.anime
    }
  }
}
</script>
