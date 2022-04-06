<template>
  <v-card class="d-flex flex-column text-center ma-3" @click="reveal = !reveal">
    <v-img :src="item.images.webp.image_url" />
    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">Informations</p>

          <p class="font-weight-black body-1">
            {{ item.title }}
          </p>

          <p class="font-weight-medium" v-if="item.score !== null">Score: {{ item.score }}/10</p>
          <p class="font-weight-medium" v-if="item.year !== null">Date de sortie: {{ item.year }}</p>
          <p class="font-weight-medium">
            Genres:
            <template v-for="genre in item.genres">
              {{ genre.name }}
            </template>
          </p>
          <p class="font-weight-medium" v-if="item.episodes !== null">
            Nombre d'épisodes: {{ item.episodes }}
          </p>
        </v-card-text>
        <v-btn :to="{ name: 'detailAnime', params: { id: item.mal_id } }"
          >More details</v-btn
        >
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'CardComponentAnime',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    reveal: false
  })
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
