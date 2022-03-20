<template>
  <v-container class="pa-4 text-center">
    <template>
      <v-slide-group
        class="pa-4"
        show-arrows
        v-if="mangas.name === 'Top anime'"
      >
        <v-slide-item v-for="(manga, i) in mangas.data" :key="i">
          <MangaSingle :manga="manga">
            <template v-slot:title> {{ manga.title }} </template>
            <template v-slot:text> {{ manga.type }} </template>
            <template v-slot:subTitle></template>
            <template v-slot:secondTitle> Synopsis </template>
            <template v-slot:textContent> {{ manga.synopsis }} </template>
          </MangaSingle>
        </v-slide-item>
      </v-slide-group>

      <v-slide-group
        class="pa-4"
        show-arrows
        v-if="mangas.name === 'Top manga'"
      >
        <v-slide-item v-for="(manga, i) in mangas.data" :key="i">
          <MangaSingle :manga="manga">
            <template v-slot:title> {{ manga.title }} </template>
            <template v-slot:text> {{ manga.scored }}/10 </template>
            <template v-slot:subTitle></template>
            <template v-slot:secondTitle> Synopsis </template>
            <template v-slot:textContent>
              {{ manga.background }} <br />
              Nombre de chapitre: {{ manga.chapters }}</template
            >
          </MangaSingle>
        </v-slide-item>
      </v-slide-group>

      <v-slide-group
        class="pa-4"
        show-arrows
        v-if="mangas.name === 'Meilleurs personnages'"
      >
        <v-slide-item v-for="(manga, i) in mangas.data" :key="i">
          <MangaSingle :manga="manga">
            <template v-slot:title> {{ manga.name }} </template>
            <template v-slot:text> </template>
            <template v-slot:subTitle
              >Nombre de favoris: {{ manga.favorites }}
            </template>
            <template v-slot:secondTitle> A propos </template>
            <template v-slot:textContent>
              {{ manga.about }} <br />
              Autre noms: <strong v-for="name in manga.nicknames" :key="name"> {{ name }}</strong></template
            >
          </MangaSingle>
        </v-slide-item>
      </v-slide-group>
    </template>
  </v-container>
</template>

<script>
import MangaSingle from './MangaSingle'
export default {
  name: 'Manga',
  components: {
    MangaSingle
  },
  props: {
    mangas: Object
  }
}
</script>
