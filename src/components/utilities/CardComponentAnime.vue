<template>
  <v-hover v-slot="{ hover }">
    <v-card width="200" class="ma-2" :elevation="hover ? 12 : 2" @click="reveal = !reveal">
      <v-img :src="item.image.jpg.medium" />
      <v-card v-if="reveal" class="v-card--reveal" style="height: 100%">
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">Informations</p>

          <p class="font-weight-black body-1">
            {{ item.title }}
          </p>

          <p class="font-weight-medium" v-if="item.score !== null">
            Score: {{ item.score }}/10
          </p>
          <p class="font-weight-medium" v-if="item.year !== null">
            Date de sortie: {{ item.year }}
          </p>
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
        <v-card-actions>
        <v-btn :to="{ name: 'detailAnime', params: { id: item.id } }"
          >More details</v-btn>
        <slot name="delete-stuff"></slot>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-hover>
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

<style lang="css" scoped>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
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
