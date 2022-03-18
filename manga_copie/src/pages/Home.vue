<template>
  <div>
    <v-navigation-drawer
      v-model="$store.state.isNavigationDrawerOpened"
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
    <Mangas />
  </div>
</template>

<script>
import Mangas from '@/components/Mangas'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Navigation')
export default {
  name: 'Home',

  components: {
    Mangas
  },
  data () {
    return {
      action: 'mdi-format-list-bulleted',
      isOpened: false
    }
  },
  methods: {
    getGenreMangas: function (idGenre) {
      this.$store.dispatch('Mangas/getGenreMangas', idGenre)
    }
  },
  computed: {
    ...mapState({
      items: (state) => state.itemNavigationDrawer
    })
  },
  beforeMount () {
    this.$store.dispatch('Navigation/setGenreMangas')
  }
}
</script>
