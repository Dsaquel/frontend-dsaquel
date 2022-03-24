<template>
  <v-col cols="2">
    <v-sheet min-height="300px" rounded="lg">
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="indigo" dark v-bind="attrs" v-on="on">
              Filtrer
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Genres</v-list-item-title>
                  <v-sheet width="100" elevation="10" class="py-4 px-1">
                    <v-chip-group column max="3" active-class="primary--text">
                      <v-chip
                        v-for="tag in tags"
                        :key="tag.id"
                        @click="selected = tag.name"
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
              <v-btn
                color="primary"
                text
                :to="{ name: 'animeGenre', params: { genreId: selected } }"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-sheet>
  </v-col>
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
  methods: {},
  computed: {
    ...mapState({
      tags: (state) => state.Anime.tags
    })
  }
}
</script>
