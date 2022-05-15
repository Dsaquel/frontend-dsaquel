<template>
  <v-hover class="mx-2" v-slot="{ hover }">
    <v-card
      :loading="loading[i]"
      :elevation="hover ? 12 : 2"
      height="100%"
      @click="reveal = !reveal"
    >
      <template slot="progress">
         <v-progress-linear color="orange" indeterminate></v-progress-linear>
      </template>
      <v-img class="degraded" :src="item.image.jpg.medium" width="200" />
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
          <v-card-actions class="mx-auto">
            <slot name="btnTo" />
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'HoverComponent',
  props: {
    item: {
      type: Object,
      required: false
    },
    loading: {
      type: Object,
      required: false
    },
    i: {
      type: Number,
      required: false
    }
  },
  computed: {
    theme () {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
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

/* .degraded::before {
  content: '';
    position:absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
    z-index: 1;
}

.title {
    z-index: 2;
} */

</style>
