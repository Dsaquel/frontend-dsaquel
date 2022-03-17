<template>
  <v-app id="app">
    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click="$store.state.isNavigationDrawerOpened = !$store.state.isNavigationDrawerOpened" />

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

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      genre: 1,
      selectedItem: 1,
      isOpened: true
    }
  },
  methods: {
    test () {
      console.log(this.$store.state.isNavigationDrawerOpened = !this.$store.state.isNavigationDrawerOpened)
      this.$store.state.isNavigationDrawerOpened = !this.$store.state.isNavigationDrawerOpened
    }
  },
  computed: {
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
