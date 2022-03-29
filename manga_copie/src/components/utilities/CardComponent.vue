<template>
  <v-card align class="d-flex align-center flex-column text-center ma-3">
    <v-card-title>
      <slot name="title" />
    </v-card-title>

    <v-img :src="item.images.webp.image_url" />
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="reveal = true">
        Continuer
      </v-btn>
      <v-btn>Ajouter à la bibliothèque</v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">Quelques informations</p>
          <slot name="textContent" />
        </v-card-text>
        <v-card-actions>
          <v-btn text color="teal accent-4" @click="reveal = false">
            Fermer
          </v-btn>
          <v-btn>Ajouter à la bibliothèque</v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'CardComponent',
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
