<template>
  <v-card
    flat
    dark
    class="d-flex mx-auto"
    min-width="min-content"
    elevation="10"
  >
    <v-col class="d-flex d-md-flex d-lg-flex flex-md-nowrap flex-lg-wrap flex-xl-nowrap flex-sm-wrap flex-wrap">
      <v-col>
        <v-col>
          <v-img
            class="elevation-6"
            :aspect-ratio="4 / 5"
            :src="item.entry.images.jpg.image_url"
            width="100%"
            max-width="212"
          />

          <v-card-title
            class="d-inline-block text-truncate"
            style="max-width: 200px"
            >{{ item.entry.title }}</v-card-title
          >
          <div class="font-weight-regular">
            Chapters/episode viewed : {{ item.chapters_read }}
            {{ item.episodes_watched }}
          </div>

          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-sheet
                v-bind="attrs"
                v-on="on"
                min-width="max-width"
                class="ma-2"
                outlined
              >
                <span class="ma-1 font-weight-medium d-inline-block text-truncate" style="max-width: 150px;">
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
      </v-col>
      <v-col>
        <v-col>
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
                x-small
              ></v-rating>
            </div>
          </v-container>
        </v-col>
        <v-col class="mt-10">
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  :src="item.user.images.jpg.image_url"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-title>{{ item.user.username }}</v-list-item-title>

              <v-row align="center" justify="end">
                <v-icon disabled class="mr-1"> mdi-heart </v-icon>
                <span class="subheading mr-2">{{ item.votes }}</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-col>
        <v-col>
          <v-card-actions>
            <v-row align="center" justify="end">
              <v-pagination
                v-model="page"
                @input="sendPagination"
                :length="topReviewsAnime"
                circle
              />
            </v-row>
          </v-card-actions>
        </v-col>
      </v-col>
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: 'Reviews',
  props: {
    item: {
      type: Object
    },
    topReviewsAnime: {
      type: Number,
      require: true
    }
  },
  data: () => ({
    page: 1,
    dialog: false,
    description: false,
    btnDescription: { up: 'mdi-chevron-up', down: 'mdi-chevron-down' }
  }),

  methods: {
    sendPagination () {
      this.$emit('sendPagination', this.page)
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

.v-pagination__item {
  display: none;
}
.v-pagination__more {
  display: none;
}

</style>
