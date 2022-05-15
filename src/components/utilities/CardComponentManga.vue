<template>
  <v-hover v-slot="{ hover }">
    <v-card :loading="loading[i]" :elevation="hover ? 12 : 2" width="200" class="ma-2" @click="reveal = !reveal">
      <template slot="progress">
         <v-progress-linear color="orange" indeterminate></v-progress-linear>
      </template>
      <v-img v-if="item.image.jpg.medium" min-width="100%" :src="item.image.jpg.medium" />
      <v-skeleton-loader v-else type="image" width="100%" loading></v-skeleton-loader>
      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%"
        >
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary">Informations</p>
            <p class="font-weight-black body-1">
              {{ item.title.default }}
            </p>
            <p class="font-weight-medium">
              Author:
              <template v-for="author in item.authors">
                {{ author.name }}
                <template v-if="item.authors.slice(-1)[0] !== author">
                  |
                </template>
              </template>
            </p>
            <p class="font-weight-medium">
              Genres:
              <template v-for="genre in item.genres">
                {{ genre.name }}
                <template v-if="item.genres.slice(-1)[0] !== genre">
                  |
                </template>
              </template>
            </p>
            <p>
              Themes:
              <template v-for="theme in item.themes">
                {{ theme.name }}
                <template v-if="item.themes.slice(-1)[0] !== theme">
                  |
                </template>
              </template>
            </p>
            <p class="font-weight-medium">volumes: {{ item.volumes }}</p>
            <p class="font-weight-medium">chapters: {{ item.chapters }}</p>
            <p class="font-weight-medium">
              Number of favorites: {{ item.favorites }}
            </p>
          </v-card-text>

          <v-btn @click="loading[i] = true" :to="{ name: 'detailManga', params: { id: item.id } }">
            More details
          </v-btn>
          <slot name="delete-stuff"></slot>

        </v-card>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'CardComponentManga',
  props: {
    item: {
      type: Object,
      required: true
    },
    i: {
      type: Number
    }
  },
  data: () => ({
    reveal: false,
    loading: {}
  }),
  watch: {
    $route (to, from) {
      this.loading = {}
    }
  }
}
</script>

<style lang="scss">
.align-center {
  flex-basis: 15rem;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>
