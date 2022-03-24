<template>
  <div>
    <v-container>
      <div v-for="(data, i) in homeContent" :key="i">
        <a>{{ data.name }}</a>
        <SlideCard :data="data" />
      </div>
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
    }
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('Home/getHomePageContent')
  },
  computed: {
    ...mapState({
      homeContent: (state) => state.Home.homeContent
    })
  }
}
</script>
