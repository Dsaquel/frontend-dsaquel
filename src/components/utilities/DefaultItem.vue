<template>
  <v-card
    height="100%"
    :to="{ name: to, params: { id: item.mal_id } }"
  >
    <v-img
      :src="item.images.webp.image_url"
    >
    </v-img>

    <v-card-title
      style="max-width: 150px"
      class="d-inline-block text-truncate"
      >{{ item.title }}</v-card-title
    >

    <v-rating length="5" size="5" :value="item.score / 2" readonly x-small />
      <div class="ml-2">
        <v-icon disabled class="mr-1"> mdi-account-group </v-icon>
        <span class="subheading ml-1">{{ item.popularity }}</span>
      </div>

  </v-card>
</template>

<script>
export default {
  name: 'DefaultAnime',
  data: () => ({
    hover: false
  }),
  props: {
    item: {
      type: Object
    },
    to: {
      type: String
    }
  }
}
</script>
