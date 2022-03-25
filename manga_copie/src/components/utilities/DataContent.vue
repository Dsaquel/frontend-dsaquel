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
      <v-col cols="10">
        <v-sheet min-height="70vh" rounded="lg">
          <v-row>
            <v-col cols="4" v-for="n in 15" :key="n">
              <!-- TODO: put anime content -->
              <v-sheet elevation="10">sheet numéro {{ n }}</v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
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
