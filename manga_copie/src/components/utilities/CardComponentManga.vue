<template>
  <v-card class="d-flex flex-column text-center ma-3" @click="reveal = !reveal">
    <v-img min-width="100%" :src="item.images.webp.image_url" />
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
          <p class="font-weight-medium">
            Auteur:
            <template v-for="author in item.authors">
              {{ author.name }}
            </template>
          </p>
          <p class="font-weight-medium">
            Themes:
            <template v-for="theme in item.themes">
              {{ theme.name }}
            </template>
          </p>
          <p class="font-weight-medium">volumes: {{ item.volumes }}</p>
          <p class="font-weight-medium">Chapitres: {{ item.chapters }}</p>
          <p class="font-weight-medium">
            Nombres de favoris: {{ item.favorites }}
          </p>
        </v-card-text>
        <v-btn :to="{ name: 'detailManga', params: { id: item.mal_id } }">
          More details
        </v-btn>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'CardComponentManga',
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
