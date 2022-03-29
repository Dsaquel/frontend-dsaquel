<template>
  <v-container>
    <DataContent>
      <template v-slot:searchData>
        <v-text-field type="text" placeholder="Rechercher un anime" />
      </template>
      <template v-slot:animeContent>
        <v-slide-group>
          <v-slide-item v-for="item in animeUpcoming" :key="item.title">
            <CardComponent :item="item" />
          </v-slide-item>
        </v-slide-group>

        <v-slide-group>
          <v-slide-item v-for="item in animeSchedules" :key="item.title">
            <CardComponent :item="item" />
          </v-slide-item>
        </v-slide-group>
        <v-slide-group>
          <v-slide-item v-for="item in animeSeasonNow" :key="item.title">
            <CardComponent :item="item" />
          </v-slide-item>
        </v-slide-group>
        <v-btn fab icon @click="getMoreAnime">
          <v-icon>mdi-eye-plus-outline</v-icon>
        </v-btn>
      </template>
    </DataContent>
  </v-container>
</template>

<script>
import DataContent from '../utilities/DataContent'
import { mapState } from 'vuex'
import CardComponent from '../utilities/CardComponent'
export default {
  name: 'AnimeContent',
  components: {
    DataContent,
    CardComponent
  },
  methods: {
    getMoreAnime () {
      this.$store.dispatch('Anime/getAnimeSeasonNow')
    }
  },
  computed: {
    ...mapState({
      animeUpcoming: (state) => state.Home.animeUpcoming,
      animeSchedules: (state) => state.Anime.animeSchedules,
      animeSeasonNow: (state) => state.Anime.animeSeasonNow
    })
  }
}
</script>
