<template>
  <v-container class="pa-4 text-center">
    <template>
      <v-slide-group
        class="pa-4"
        show-arrows
        v-if="mangas.name === 'Top anime'"
      >
        <v-slide-item v-for="(manga, i) in mangas.data" :key="i">
          <HoverManga :manga="manga">
            <template v-slot:title> {{ manga.title }} </template>
            <template v-slot:text> {{ manga.type }} </template>
            <template v-slot:subTitle></template>
            <template v-slot:secondTitle> Quelques informations </template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ manga.title }}
              </p>

              <p class="font-weight-medium">Score: {{ manga.score }}/10</p>
              <p class="font-weight-medium">Date de sortie: {{ manga.year }}</p>
              <p class="font-weight-medium">
                Genres:
                <template v-for="genre in manga.genres">
                  {{ genre.name }}
                </template>
              </p>
              <p class="font-weight-medium">
                Nombre d'épisodes: {{ manga.episodes }}
              </p>
            </template>
          </HoverManga>
        </v-slide-item>
      </v-slide-group>

      <v-slide-group
        class="pa-4"
        show-arrows
        v-if="mangas.name === 'Top manga'"
      >
        <v-slide-item v-for="(manga, i) in mangas.data" :key="i">
          <HoverManga :manga="manga">
            <template v-slot:title> {{ manga.title }} </template>
            <template v-slot:text> {{ manga.scored }}/10 </template>
            <template v-slot:subTitle></template>
            <template v-slot:secondTitle>Quelques informations</template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ manga.title }}
              </p>
              <p class="font-weight-medium">
                Auteur:
                <template v-for="author in manga.authors">
                  {{ author.name }}
                </template>
              </p>
              <p class="font-weight-medium">
                Themes:
                <template v-for="theme in manga.themes">
                  {{ theme.name }}
                </template>
              </p>
              <p class="font-weight-medium">
                volumes: {{ manga.volumes }}
              </p>
              <p class="font-weight-medium">
                Chapitres: {{ manga.chapters }}
              </p>
              <p class="font-weight-medium">
                Nombres de favoris: {{ manga.favorites }}
              </p>
            </template>
          </HoverManga>
        </v-slide-item>
      </v-slide-group>

      <v-slide-group
        class="pa-4"
        show-arrows
        v-if="mangas.name === 'Meilleurs personnages'"
      >
        <v-slide-item v-for="(manga, i) in mangas.data" :key="i">
          <HoverManga :manga="manga">
            <template v-slot:title> {{ manga.name }} </template>
            <template v-slot:text> </template>
            <template v-slot:subTitle
              >Nombre de favoris: {{ manga.favorites }}
            </template>
            <template v-slot:secondTitle> A propos </template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ manga.title }}
              </p>
              <p class="font-weight-medium">
                Nom Japonais: {{ manga.name_kanji }}
              </p>
              <div class="font-weight-medium" v-if="manga.nicknames.length > 0">
                Surnoms:
                <p v-for="(nickname, i) in manga.nicknames" :key="i">
                  {{ nickname }}
                </p>
              </div>
              <p class="font-weight-medium">
                Nombre de favoris: {{ manga.favorites }}
              </p>
            </template>
          </HoverManga>
        </v-slide-item>
      </v-slide-group>
    </template>
  </v-container>
</template>

<script>
import HoverManga from './HoverManga'
export default {
  name: 'SlideCard',
  components: {
    HoverManga
  },
  props: {
    mangas: Object
  }
}
</script>
