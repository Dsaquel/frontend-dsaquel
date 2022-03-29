<template>
  <v-card class="mx-auto" width="500" max-width="70%" elevation="10">
    <v-row class="d-flex flex-md-nowrap">
      <v-col>
        <v-img
          class="elevation-6 mx-auto"
          :aspect-ratio="4 / 5"
          :src="item.entry.images.jpg.image_url"
          max-width="100%"
        >
          <v-card-title
            class="d-xl-none d-md-none d-lg-none d-inline-block text-truncate"
            style="max-width: 200px"
            >{{ item.entry.title }}</v-card-title
          >
          <v-btn
            class="d-xl-none d-md-none d-lg-none d-flex"
            color="primary"
            fab
            absolute
            bottom
            right
            x-large
            dark
            @click="description = !description"
          >
            <v-icon v-if="description">{{ btnDescription.up }}</v-icon>
            <v-icon v-else>{{ btnDescription.down }}</v-icon>
          </v-btn>
        </v-img>

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
          </v-card>
        </v-dialog>
      </v-col>
      <v-col v-show="description">
        <slot name="chaptersRead" />
        <slot name="scores" />
        <v-container>
          <div v-for="(score, key) in item.scores" :key="key">
            <span class="grey--text text--lighten-2 text-caption mr-2"
              >{{ key }} {{ score }}/10</span
            >
            <v-rating length="10" size="10" :value="score" readonly></v-rating>
          </div>
        </v-container>
        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                alt=""
                :src="item.user.images.jpg.image_url"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.user.username }}</v-list-item-title>
            </v-list-item-content>

            <v-row align="center" justify="end">
              <v-icon disabled class="mr-1"> mdi-heart </v-icon>
              <span class="subheading mr-2">{{ item.votes }}</span>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'Reviews',
  props: {
    item: {
      type: Object,
      dialog: false
    }
  },
  data: () => ({
    description: true,
    btnDescription: { up: 'mdi-chevron-up', down: 'mdi-chevron-down' }
  })
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
