<template>
  <v-container class="pa-4 text-center">
    <template>
      <v-slide-group class="pa-4" show-arrows>
        <v-slide-item v-for="(anime, i) in animeUpcoming" :key="i">
          <HoverComponent :item="anime">
            <template v-slot:subTitle></template>
            <template v-slot:secondTitle> Quelques informations </template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ anime.title.default }}
              </p>

              <p class="font-weight-medium" v-if="anime.score">Score: {{ anime.score }}/10</p>
              <p class="font-weight-medium">
                Genres:
                <template v-for="genre in anime.genres">
                {{ genre.name }}
                <template v-if="anime.genres.slice(-1)[0] !== genre">
                  |
                </template>
              </template>
              </p>
              <p v-if="anime.year">announced  for: {{ anime.year }}</p>
            </template>
            <template v-slot:btnTo>
              <v-btn
                :to="{
                  name: 'detailAnime',
                  params: { id: anime.id },
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
            <template v-slot:secondTitle>Some informations</template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ manga.title.default }}
              </p>
              <p class="font-weight-medium">
                Author:
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
              <p class="font-weight-medium">Chapters: {{ manga.chapters }}</p>
            </template>
            <p v-if="manga.scored">{{ manga.scored }}/10 </p>
            <template v-slot:btnTo>
              <v-btn
                :to="{
                  name: 'detailManga',
                  params: { id: manga.id },
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
            <template v-slot:text> </template>
            <template v-slot:subTitle
              >
            </template>
            <template v-slot:secondTitle> A propos </template>
            <template v-slot:textContent>
              <p class="font-weight-black body-1">
                {{ character.title }}
              </p>
              <p v-if="character.nameKanji" class="font-weight-medium">
                japanese name: {{ character.nameKanji }}
              </p>
              <div
                class="font-weight-medium"
                v-if="character.nicknames.length !== 0"
              >Nicknames:
              <template v-for="nickname in character.nicknames">
                {{ nickname }}
                <template v-if="character.nicknames.slice(-1)[0] !== nickname">
                  |
                </template>
              </template>
              </div>
              <div class="font-italic" v-else>No nicknames</div>
              <p class="font-weight-medium">
                 Number of favorites: {{ character.favorites }}
              </p>
            </template>
            <template v-slot:btnTo>
              <v-btn
                :to="{
                  name: 'detailCharacter',
                  params: { id: character.id },
                }"
                > more detail</v-btn
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
import { mapGetters } from 'vuex'
export default {
  props: {},
  name: 'SlideCard',
  components: {
    HoverComponent
  },
  computed: {
    ...mapGetters({
      topManga: 'Home/topManga',
      animeUpcoming: 'Home/animeUpcoming',
      topCharacters: 'Home/topCharacters'
    })
  }
}
</script>
