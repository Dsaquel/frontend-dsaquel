<template>
  <v-app id="app">
    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click="show = !show" />

      <v-toolbar-title>Manga</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
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
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer ref="navigationDrawer" v-model="show" clipped app>
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
            @click="getMangaList(child.mal_id)"
            link
            :to="{ path: 'manga-list/genre/' + child.name }"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      genre: 1,
      selectedItem: 1,
      isOpened: true,
      action: 'mdi-format-list-bulleted',
      show: false
    }
  },
  methods: {
    getMangaList: function (idGenre) {
      const path = `anime?genres=${idGenre}?&order_by=score&sort=desc&sfw`
      this.$store.dispatch('Mangas/getMangaList', path)
    }

  },
  watch: {
    show () {
      if (this.show) {
        // this.$store.dispatch('Navigation/setGenreMangas')
      }
    }
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
