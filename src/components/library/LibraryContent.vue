<template>
    <h2>{{this.$store.state.User.name}}</h2>
</template>

<script>
export default {
  name: 'LibraryContent',

  beforeCreate () {
    this.$store.user.dispatch('getMangas')
  }
}
</script>
