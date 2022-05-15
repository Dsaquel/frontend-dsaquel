<template>
    <v-slide-group class="my-2">
      <v-slide-item v-for="n in 9" :key="n">
        <v-skeleton-loader elevation="2" class="mx-2" type="image" height="100%" width="200" loading />
      </v-slide-item>
    </v-slide-group>
</template>
<script>
export default {
  name: 'SlideCardLoader'
}
</script>
