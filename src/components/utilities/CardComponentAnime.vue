<template>
  <v-hover v-slot="{ hover }">
    <v-card :loading="loading[i]" width="200" class="ma-2" :elevation="hover ? 12 : 2" @click="reveal = !reveal">
      <template slot="progress">
         <v-progress-linear color="orange" indeterminate></v-progress-linear>
      </template>
      <v-img v-if="item.image.jpg.medium" :src="item.image.jpg.medium" />
      <v-skeleton-loader v-else type="image" width="100%" loading></v-skeleton-loader>
      <v-card v-if="reveal" class="v-card--reveal" style="height: 100%">
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">Informations</p>

          <p class="font-weight-black body-1">
            {{ item.title.default }}
          </p>

          <p class="font-weight-medium" v-if="item.score !== null">
            commununity score: {{ item.score }}/10
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
          <p class="font-weight-medium" v-if="item.episodes !== null">
            Announced episodes: {{ item.episodes }}
          </p>
          <p class="font-weight-medium" v-if="item.airInfo.status !== null">
            {{ item.airInfo.status }}
          </p>
        </v-card-text>
          <v-btn
          @click="loading[i] = true"
          :to="{ name: 'detailAnime', params: { id: item.id } }"
          >More details</v-btn>
          <slot name="delete-stuff"></slot>
      </v-card>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'CardComponentAnime',
  props: {
    i: {
      type: Number,
      required: false
    },
    item: {
      type: Object,
      required: true
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

<style lang="css" scoped>

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
