<template>
  <v-app id="app">
    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click="isOpened = !isOpened" />

      <v-toolbar-title>Dsaquel</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn >
        <v-icon class="mr-2">mdi-account-circle</v-icon>
        Se connecter
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="green"></v-tabs-slider>
          <v-tab v-for="tab in tabs" :key="tab.name" :to="tab.to">
            {{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="isOpened" clipped app>
      <v-list>
        <v-list-item v-for="item in menus" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div v-if="isUserConnected" class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      tabs: [
        { name: 'Home', to: '/' },
        { name: 'Anime', to: '/anime' },
        { name: 'Manga', to: '/manga' }
      ],
      tab: null,
      isUserConnected: true,
      isOpened: false
    }
  },
  methods: {},
  computed: {
    menus () {
      const menus = [
        { title: 'Suggestion', icon: 'mdi-gavel' }
      ]
      if (this.isUserConnected) {
        menus.push({ title: 'Account', icon: 'mdi-account-box' }, { title: 'Library', icon: 'mdi-view-dashboard' })
      }
      return menus
    }
  }
}
</script>
