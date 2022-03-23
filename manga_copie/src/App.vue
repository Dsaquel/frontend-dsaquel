<template>
  <v-app id="app">
    <v-card>
      <v-toolbar flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Mangas</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="green"></v-tabs-slider>
            <v-tab v-for="item in items" :key="item.name" :to="item.to">
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </v-card>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <!-- menu -->
  <!-- <v-menu bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in menus" :key="i" :to="item.to">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu> -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      genre: 1,
      selectedItem: 1,
      items: [
        { name: 'Home', to: '/' },
        { name: 'Anime', to: '/anime' },
        { name: 'Manga', to: '/manga' }
      ],
      tab: null,
      text: 'toto',
      // navigation drawer deleted
      action: 'mdi-format-list-bulleted',
      show: false
    }
  },
  methods: {
    // TODO: onclick get gender manga
    // getMangaList: function (idGenre) {
    //   const path = `anime?genres=${idGenre}?&order_by=score&sort=desc&sfw`
    //   this.$store.dispatch('Mangas/getMangaList', path)
    // }
    // TODO: get all genders mangas
    // this.$store.dispatch('Navigation/setGenreMangas')
  },
  computed: {
    ...mapState({
      items: (state) => state.Navigation.itemNavigationDrawer
    }),
    menus () {
      const menus = []
      if (this.$store.getters.isUserConnected) {
        menus.length = 0
        menus.push(
          { title: 'Profile', icon: 'mdi-account', to: '/' },
          { title: 'Library', icon: 'mdi-book-account-outline', to: '/' },
          { title: 'Se deconnecter', icon: 'mdi-logout', to: '/' }
        )
      } else {
        menus.length = 0
        menus.push(
          { title: 'Se conncter', icon: 'mdi-login', to: '/login' },
          { title: "S'inscrire", icon: 'mdi-account-plus', to: '/register' }
        )
      }
      return menus
    }
  }
}
</script>
