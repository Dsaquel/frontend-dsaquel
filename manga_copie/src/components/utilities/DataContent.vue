<template>
  <v-container>
    <slot name="searchData" />
    <v-row>
      <CardFilterGenders @affectTag="affectTag">
        <template v-slot:toAnime>
          <v-btn
            color="primary"
            text
            :to="{ name: 'animeGenre', params: { genreId: selected } }"
          >
            Save
          </v-btn>
        </template>
        <template v-slot:toManga>
          <v-btn
            color="primary"
            text
            :to="{ name: 'mangaGenre', params: { genreId: selected } }"
          >
            Save
          </v-btn>
        </template>
      </CardFilterGenders>
      <v-col cols="2">
        <slot name="animeContent" />
        <slot name="mangaContent" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardFilterGenders from '../utilities/CardFilterGenders'

export default {
  name: 'DataContent',
  components: {
    CardFilterGenders
  },
  data: () => ({
    selected: ''
  }),
  methods: {
    affectTag (tag) {
      this.selected = tag
    }
  }
}
</script>
