<template>
    <h2>Email confirmation desu</h2>
</template>

<script>
export default {
  name: 'EmailConfirmation',
  beforeMount () {
    this.$store.dispatch('emailConfirmation', this.$route.params)
  }
}
</script>
