<template>
  <SlideCard />
</template>

<script>
import { mapState } from 'vuex'
import SlideCard from './SlideCard.vue'
export default {
  name: 'HomeContent',
  components: { SlideCard },
  data () {
    return {
      loader: false
    }
  },
  beforeMount () {

  },
  mounted () {
    this.$store.dispatch('Home/GET_TOP_MANGA')
    this.$store.dispatch('Home/GET_ANIME_UPCOMING')
    this.$store.dispatch('Home/GET_TOP_CHARACTERS')
  },
  computed: {
    ...mapState({})
  }
}
</script>
