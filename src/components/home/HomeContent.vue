<template>
  <div>
    <v-container>
      <SlideCard />
    </v-container>
  </div>
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
    this.$store.dispatch('Home/getTopManga')
    this.$store.dispatch('Home/getTopCharacters')
    this.$store.dispatch('Home/getAnimeUpcoming')
  },
  computed: {
    ...mapState({})
  }
}
</script>
