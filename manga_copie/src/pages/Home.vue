<template>
  <div>
    <v-navigation-drawer
      v-model="isNavigationDrawerOpened"
      clipped
      app
    >
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          :prepend-icon="action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.mal_id"
            @click="getGenreMangas(child.mal_id)"
            link
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <HomeContent />
  </div>
</template>

<script>
import HomeContent from '../components/HomeContent'
import { mapState } from 'vuex'
export default {
  name: 'Home',

  components: {
    HomeContent

  },
  data () {
    return {
      page: 1,
      action: 'mdi-format-list-bulleted'
    }
  },
  methods: {
    getGenreMangas: function (idGenre) {
      this.page = 1
      this.$store.dispatch('Mangas/getGenreMangas', idGenre)
    }
  },
  computed: {
    ...mapState({
      items: state => state.Navigation.itemNavigationDrawer,
      isNavigationDrawerOpened: (state) => state.isNavigationDrawerOpened,
      lastPageVisible: (state) => state.Mangas.lastPageVisible
    })
  },
  mounted () {
    // setTimeout(this.$store.dispatch('Navigation/setGenreMangas'), 10000)
    // this.$store.dispatch('Mangas/test')
  }
}
</script>
