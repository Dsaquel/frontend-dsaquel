<template>
  <SlideCard />
</template>

<script>
import SlideCard from './SlideCard.vue'
export default {
  name: 'HomeContent',
  components: { SlideCard },
  data: () => ({
    loader: false
  }),
  beforeCreate: function () {
    this.$store.dispatch('Home/GET_TOP_MANGA')
    this.$store.dispatch('Home/GET_ANIME_UPCOMING')
    this.$store.dispatch('Home/GET_TOP_CHARACTERS')
  }
}
</script>
