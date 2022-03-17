<template>
      <v-card
        align
        class="d-flex align-center flex-column text-center ma-3"
      >
        <v-card-title>
          {{ manga.title }}
        </v-card-title>

          <v-img :src="manga.images.webp.image_url" />
          <v-card-actions>
            <v-btn :href="manga.url"> Continuer </v-btn>
            <slot name="library" />
          </v-card-actions>

      </v-card>
</template>

<script>
export default {
  name: 'Manga',
  data () {
    return {}
  },
  props: {
    manga: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scooped lang="scss">
.align-center {
  flex-basis: 15rem;
}
</style>
