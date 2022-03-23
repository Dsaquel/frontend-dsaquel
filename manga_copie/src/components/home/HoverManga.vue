<template>
  <v-hover class="mx-2" v-slot="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
      width="100%"
      max-width="100%"
      @click="reveal = !reveal"
    >
      <v-img :src="manga.images.jpg.image_url" width="100%" height="340">
        <v-card-title class="text-h6 white--text">
          <v-row class="fill-height flex-column" justify="space-between">
            <p class="mt-4 subheading text-left">
              <slot name="title" />
            </p>
            <p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
              <slot name="text" />
            </p>

            <p class="text-caption font-weight-medium font-italic text-left">
              <slot name="subTitle" />
            </p>
          </v-row>
        </v-card-title>
      </v-img>
      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%"
        >
          <v-card-text class="pb-0">
            <p class="text-h5 text--primary">
              <slot name="secondTitle" />
            </p>
            <slot name="textContent" />
          </v-card-text>
          <slot name="btnTo" />
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'HoverManga',
  props: {
    manga: {
      type: Object
    }
  },
  data: () => ({
    reveal: false,
    icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
    transparent: 'rgba(255, 255, 255, 0)'
  })
}
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.4;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

html {
  overflow: hidden !important;
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
