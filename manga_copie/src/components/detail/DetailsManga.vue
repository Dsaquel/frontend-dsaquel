<template>
  <div>
    <h1>DetailManga.vue です</h1>
    <h1>Il s'agit de {{manga.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'DetailsManga',
  beforeMount () {
    console.log(this.$route.params.id)
    this.$store.dispatch('Mangas/getManga', this.$route.params.id)
  },
  beforeDestroy () {
    this.$store.commit('Mangas/setManga', null)
  },
  computed: {
    manga () {
      return this.$store.state.Mangas.manga
    }
  }
}
</script>
