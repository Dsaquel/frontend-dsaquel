<template>
  <v-container>
    <v-card v-if="character">
      <h2 v-if="character.name">Character: {{ character.name }}</h2>
      <v-row justify="center">
        <v-col
          cols="12"
          lg="2"
        >
          <v-img
            v-if="character.image.jpg.medium"
            max-width="280"
            :src="character.image.jpg.medium"
          ></v-img>
        </v-col>
        <v-col
          cols="12"
          lg="8"
        >
          <v-card-text>
            <p v-if="character.nameKanji">Name kanji: {{ character.nameKanji }}</p>
            <p v-if="character.about">About: {{ character.about }}</p>
            <p v-if="character.favorites">favorites: {{ character.favorites }}</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-progress-linear
      v-else
      indeterminate
      color="green"
    />
  </v-container>
</template>

<script>
export default {
  name: 'DetailsCharacter',
  beforeMount () {
    this.$store.dispatch('Character/GET_CHARACTER', this.$route.params.id)
  },
  beforeDestroy () {
    this.$store.commit('Character/SET_CHARACTER', null)
  },
  computed: {
    character () {
      return this.$store.state.Character.character
    }
  }
}
</script>
