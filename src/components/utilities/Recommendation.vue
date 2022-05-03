<template>
  <v-card
    flat
    dark
    class="d-flex mx-auto"
    max-width="300"
    elevation="10"
  >
    <v-col
      class="
        d-flex d-md-flex d-lg-flex
        flex-md-nowrap flex-lg-wrap flex-xl-nowrap flex-sm-wrap flex-wrap
      "
    >
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
            <v-list-item class="grow">
              <router-link
              :to="{name: 'detailManga', params: {id: item.entry.mal_id}}">more</router-link>

              <v-row align="center" justify="end">
                <v-icon disabled class="mr-1"> mdi-heart </v-icon>
                <span class="subheading mr-2">{{ item.votes }}</span>
              </v-row>
            </v-list-item>
          </div>
        </v-col>
        <v-col>
          <v-card-actions>
            <v-row align="center" justify="end">
              <v-pagination
                v-model="page"
                @input="sendPagination"
                :length="recommendation"
                circle
                id="recommendation"
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
    recommendation: {
      type: Number,
      require: true
    }
  },
  data: () => ({
    page: 1
  }),

  methods: {
    sendPagination () {
      this.$emit('sendPagination', this.page)
    }
  }
}
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  white-space: normal;
}
#recommendation >>> .v-pagination__item {
  display: none;
}
#recommendation >>> .v-pagination__more {
  display: none;
}
</style>
