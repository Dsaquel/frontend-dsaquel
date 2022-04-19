<template>
  <v-card
    width="180"
    :to="{ name: 'detailManga', params: { id: item.mal_id } }"
  >
    <v-img
      :aspect-ratio="1 / 1"
      class="mx-auto"
      width="100%"
      :src="item.images.webp.image_url"
    >
    </v-img>

    <v-card-title
      style="max-width: 150px"
      class="d-inline-block text-truncate"
      >{{ item.title }}</v-card-title
    >

    <v-rating length="5" size="5" :value="item.score / 2" readonly x-small />
    <v-row align="center" justify="end">
      <v-icon disabled class="mr-1"> mdi-book-heart </v-icon>
      <span class="subheading mr-2">{{ item.popularity }}</span>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'DefaultManga',
  data: () => ({
    hover: false
  }),
  props: {
    item: {
      type: Object
    }
  }
}
</script>
