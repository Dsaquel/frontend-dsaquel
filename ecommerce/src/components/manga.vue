<template>
  <div>
    {{ toto }} <br>
    <!-- {{ toto.images.webp.image_url }} -->
  </div>
</template>

<script>
export default {
  name: 'Manga',
  props: {
    toto: {
      type: String,
      required: true
    }
  },
  mounted () {
    console.log('jhdjf')
  }
}
</script>
