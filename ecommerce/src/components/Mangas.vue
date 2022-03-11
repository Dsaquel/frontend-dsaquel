<template>
<div>
  <h1>Mangas</h1>
  <Manga :toto="'toto'" />
</div>
</template>

<script>
import Manga from '@/components/Manga'
export default {
  name: 'Mangas',
  components: {
    Manga
  }
}
</script>
