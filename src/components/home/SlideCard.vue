<template>
  <v-container class="pa-4 text-center">
    <template>
      <v-slide-group class="pa-4" show-arrows>
        <v-slide-item v-for="(anime, i) in animeUpcoming" :key="i">
          <HoverComponent :item="anime">
            <template v-slot:title> {{ anime.title }} </template>
            <template v-slot:text> {{ anime.type }} </template>
            <template v-slot:subTitle></template>
            <template v-slot:secondTitle> Quelques informations </template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ anime.title }}
              </p>

              <p class="font-weight-medium">Score: {{ anime.score }}/10</p>
              <p class="font-weight-medium">Date de sortie: {{ anime.year }}</p>
              <p class="font-weight-medium">
                Genres:
                <template v-for="genre in anime.genres">
                  {{ genre.name }}
                </template>
              </p>
              <p class="font-weight-medium">
                Nombre d'épisodes: {{ anime.episodes }}
              </p>
            </template>
            <template v-slot:btnTo>
              <v-btn
                :to="{
                  name: 'detailAnime',
                  params: { id: anime.mal_id },
                }"
                >Detail</v-btn
              >
            </template>
          </HoverComponent>
        </v-slide-item>
      </v-slide-group>

      <v-slide-group class="pa-4" show-arrows>
        <v-slide-item v-for="(manga, i) in topManga" :key="i">
          <HoverComponent :item="manga">
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
              <p class="font-weight-medium">volumes: {{ manga.volumes }}</p>
              <p class="font-weight-medium">Chapitres: {{ manga.chapters }}</p>
              <p class="font-weight-medium">
                Nombres de favoris: {{ manga.favorites }}
              </p>
            </template>
            <template v-slot:btnTo>
              <v-btn
                :to="{
                  name: 'detailManga',
                  params: { id: manga.mal_id },
                }"
                >Detail</v-btn
              >
            </template>
          </HoverComponent>
        </v-slide-item>
      </v-slide-group>

      <v-slide-group class="pa-4" show-arrows>
        <v-slide-item v-for="(character, i) in topCharacters" :key="i">
          <HoverComponent :item="character">
            <template v-slot:title> {{ character.name }} </template>
            <template v-slot:text> </template>
            <template v-slot:subTitle
              >Nombre de favoris: {{ character.favorites }}
            </template>
            <template v-slot:secondTitle> A propos </template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ character.title }}
              </p>
              <p class="font-weight-medium">
                Nom Japonais: {{ character.name_kanji }}
              </p>
              <div
                class="font-weight-medium"
                v-if="character.nicknames.length > 0"
              >
                Surnoms:
                <p v-for="(nickname, i) in character.nicknames" :key="i">
                  {{ nickname }}
                </p>
              </div>
              <p class="font-weight-medium">
                Nombre de favoris: {{ character.favorites }}
              </p>
            </template>
            <template v-slot:btnTo>
              <v-btn
                :to="{
                  name: 'detailCharacter',
                  params: { id: character.mal_id },
                }"
                >Detail</v-btn
              >
            </template>
          </HoverComponent>
        </v-slide-item>
      </v-slide-group>
    </template>
  </v-container>
</template>

<script>
import HoverComponent from '../utilities/HoverComponent'
import { mapState } from 'vuex'
export default {
  props: {},
  name: 'SlideCard',
  components: {
    HoverComponent
  },
  computed: {
    ...mapState({
      topManga: (state) => state.Home.topManga,
      animeUpcoming: (state) => state.Home.animeUpcoming,
      topCharacters: (state) => state.Home.topCharacters
    })
  }
}
</script>
