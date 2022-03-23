<template>
    <h1>Je suis {{ character.name }}</h1>
</template>

<script>
export default {
  name: 'DetailsCharacter',
  beforeMount () {
    this.$store.dispatch('Character/getCharacter', this.$route.params.id)
  },
  beforeDestroy () {
    this.$store.commit('Character/setCharacter', null)
  },
  computed: {
    character () {
      return this.$store.state.Character.character
    }
  }
}
</script>
