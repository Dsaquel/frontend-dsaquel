<template>
  <v-menu max-width="max-content">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="primary" dark v-bind="attrs" v-on="on"> <v-icon>mdi-filter-variant</v-icon> </v-btn>
    </template>
    <v-card min-width="max-content">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Genres</v-list-item-title>
            <v-sheet width="100" elevation="10" class="py-4 px-1">
              <v-chip-group column max="3" active-class="primary--text">
                <v-chip
                  v-for="tag in tags"
                  :key="tag.id"
                  @click="affectTag(tag.name)"
                >
                  {{ tag.name }}
                </v-chip>
              </v-chip-group>
            </v-sheet>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch disabled v-model="score" color="purple"></v-switch>
          </v-list-item-action>
          <v-list-item-title>Meilleur score en premier</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-switch disabled v-model="hints" color="purple"></v-switch>
          </v-list-item-action>
          <v-list-item-title>Trié les animes haram</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="menu = false"> Cancel </v-btn>
        <slot
          v-if="
            this.$route.name === 'anime' || this.$route.name === 'animeGenre'
          "
          name="toAnime"
        />
        <slot
          v-if="
            this.$route.name === 'manga' || this.$route.name === 'mangaGenre'
          "
          name="toManga"
        />
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardFilterGenders',
  data: () => ({
    selected: '',
    menu: false,
    score: true,
    hints: true
  }),
  props: {},

  methods: {
    affectTag (tag) {
      this.$emit('affectTag', tag)
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.Anime.tags
    })
  }
}
</script>
