<template>
  <v-card
    flat
    dark
    class="d-flex mx-auto"
    min-width="min-content"
    elevation="10"
  >
    <v-row class="d-flex d-md-flex d-lg-flex flex-sm-nowrap">
      <v-col>
        <v-img
          class="elevation-6 mx-auto"
          :aspect-ratio="4 / 5"
          :src="item.entry.images.jpg.image_url"
          width="100%"
        />

        <v-card-title
          class="d-inline-block text-truncate"
          style="max-width: 200px"
          >{{ item.entry.title }}</v-card-title
        >
        <v-dialog v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-sheet
              v-bind="attrs"
              v-on="on"
              min-width="max-width"
              class="ma-2"
              outlined
            >
              <span class="ma-1 font-weight-medium truncate">
                {{ item.review }}
              </span>
            </v-sheet>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h3">{{ item.entry.title }}</span>
            </v-card-title>
            <v-card-text>{{ item.review }}</v-card-text>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Close
            </v-btn>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <slot name="chaptersRead" />
            <v-container>
              <div v-for="(score, key) in item.scores" :key="key">
                <span class="grey--text text--lighten-2 text-caption mr-2"
                  >{{ key }} {{ score }}/10</span
                >
                <v-rating
                  length="10"
                  size="10"
                  :value="score"
                  readonly
                ></v-rating>
              </div>
            </v-container>
            <v-spacer></v-spacer>
            <v-col>
              <v-card-actions class="flex-end">
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      alt=""
                      :src="item.user.images.jpg.image_url"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      item.user.username
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-row align="center" justify="end">
                    <v-icon disabled class="mr-1"> mdi-heart </v-icon>
                    <span class="subheading mr-2">{{ item.votes }}</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'Reviews',
  props: {
    item: {
      type: Object
    }
  },
  data: () => ({
    description: false,
    dialog: false,
    btnDescription: { up: 'mdi-chevron-up', down: 'mdi-chevron-down' }
  }),
  beforeDestroy () {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },

  mounted () {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize () {
      this.description = window.innerWidth < 960
    }
  }
}
</script>

<style scooped lang="scss">
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  white-space: normal;
}
</style>
