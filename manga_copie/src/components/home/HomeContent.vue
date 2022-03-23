<template>
  <div>
    <v-container>
      <div v-for="(mangas, i) in homeContent" :key="i">
        <router-link :to="{name: 'detail', params: {id: mangas.name} }">{{ mangas.name }}</router-link>
        <SlideCard :mangas="mangas" />
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
    ...mapState('Home', {
      homeContent: state => state.homeContent
    })
  }
}
</script>
