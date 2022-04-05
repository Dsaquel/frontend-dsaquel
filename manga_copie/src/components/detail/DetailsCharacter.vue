<template>
     <v-container>
    <v-card>
      <h2>{{ character.name }}</h2>
      <v-row justify="center">
        <v-col cols="12" lg="2">
          <v-img max-width="280" :src="character.images.jpg.image_url"></v-img>
        </v-col>
        <v-col cols="12" lg="8">
          <v-card-text>
            {{ character.name_kanji }} <br>
            About: <br />
            {{ character.about }}
            <br />
            Nombre de favoris: {{ character.favorites }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'DetailsCharacter',
  beforeMount () {
    this.$store.dispatch('Character/getCharacter', this.$route.params.id)
  },
  beforeDestroy () {
    this.$store.commit('Character/setCharacter', null)
  },
  computed: {
    character () {
      return this.$store.state.Character.character
    }
  }
}
</script>
