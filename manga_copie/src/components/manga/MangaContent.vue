<template>
  <v-container>
    <DataContent>
      <template v-slot:searchData>
        <input type="text" placeholder="Rechercher un manga" />
      </template>
    </DataContent>
  </v-container>
</template>

<script>
import DataContent from '../utilities/DataContent'
export default {
  name: 'MangaContent',
  components: {
    DataContent
  }
}
</script>
