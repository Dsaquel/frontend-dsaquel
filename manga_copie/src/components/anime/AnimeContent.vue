<template>
  <v-container>
    <v-row>
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
                        <v-chip-group
                          column
                          max="3"
                          active-class="primary--text"
                        >
                          <v-chip
                            v-for="tag in tags"
                            :key="tag.id"
                            @click="selected = tag.id"
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
                      <v-switch
                        disabled
                        v-model="score"
                        color="purple"
                      ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title
                      >Meilleur score en premier</v-list-item-title
                    >
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-action>
                      <v-switch
                        disabled
                        v-model="hints"
                        color="purple"
                      ></v-switch>
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
      <v-col cols="10">
        <v-sheet min-height="70vh" rounded="lg">
          <!-- MANGA CONTENT -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AnimeContent',
  data: () => ({
    selected: '',
    tags: [
      { name: 'Action', id: 1 },
      { name: 'Aventure', id: 2 },
      { name: 'Comedy', id: 4 },
      { name: 'Drama', id: 8 },
      { name: 'Fantasy', id: 10 },
      { name: 'Girls love', id: 26 },
      { name: 'Gourmet', id: 47 },
      { name: 'Horreur', id: 14 },
      { name: 'Mystery', id: 7 },
      { name: 'Romance', id: 22 },
      { name: 'Sci-fi', id: 24 },
      { name: 'Slice of life', id: 36 },
      { name: 'Sports', id: 30 },
      { name: 'Supernatural', id: 37 },
      { name: 'Suspense', id: 41 }
    ],
    menu: false,
    score: true,
    hints: true
  }),
  methods: {
    getAnimeGenres: function () {
      let score = ''
      if (this.score) score = 'toto'
      console.log(score)
      if (this.selected !== '') { this.$store.dispatch('Anime/getAnimeGenres', this.selected) }
    }
  }
}
</script>
