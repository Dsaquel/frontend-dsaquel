<template>
    <h2>Coucou tu es sur une page de détails concernant {{ manga.title }}</h2>
</template>

<script>
export default {
  name: 'DetailsManga',
  props: {
    manga: {
      type: Object,
      Requried: true
    }
  }
}
</script>
